import { fork } from "redux-saga/effects";
import {expectSaga, testSaga} from "redux-saga-test-plan";
import {EffectProviders, StaticProvider} from "redux-saga-test-plan/providers";

import { config } from "config";
import {
  actionAddFoodCreator,
  actionSetWorkerCapacityCreator
} from "./actions";
import {saga, initStorageSaga, fieldProductionSaga, sawProductionSaga} from './saga';
import {workers} from "../workers";

interface IWorker {}

describe("skladiště - sága", () => {
  const rootSagaProviders: EffectProviders | StaticProvider[] = [
    [fork(initStorageSaga), null],
    [fork(fieldProductionSaga), null],
    [fork(sawProductionSaga), null],
  ];
  it("po spuštění zavolá ságy pro inicializaci skladiště a produkci surovin", () => expectSaga(saga)
      .provide(rootSagaProviders)
      .fork(initStorageSaga)
      .fork(fieldProductionSaga)
      .fork(sawProductionSaga)
      .silentRun()
  );

  describe("sága pro inicializaci skladiště", () => {
    const gameConfigMock = {startingWorkerCapacity: 100};
    it("načte ze store konfiguraci hry a dispatchne akci pro nastavení kapacity pracovníků", () => {
      testSaga(initStorageSaga)
              .next()
              .select(config.getGameConfig)
              .next(gameConfigMock)
              .put(actionSetWorkerCapacityCreator(gameConfigMock.startingWorkerCapacity))
              .next()
              .isDone()
    });
  })

  describe("sága pro produkci jídla na poli", () => {
    const gameConfigMock = {fieldProductionSeconds: 1, fieldProductionPerWorkerRatio: 5};
    it("Pokud jsou na poli pracovníci, tak po dané prodlevě dipatchuje akci pro přidání jídla do skladiště", () => {
      const singleFiledWorkerMock: Array<IWorker> = [{
        id: "0x0",
        name: "rollin",
        gender: workers.Gender.male,
        workOccupation: workers.WorkOccupation.field,
        description: 'stone',
        isStarving: false,
        hasPassed: false,
      }];
      testSaga(fieldProductionSaga)
          .next()
          .select(config.getGameConfig)
          .next(gameConfigMock)
          .delay(gameConfigMock.fieldProductionSeconds * 1000)
          .next()
          .select(workers.getFieldWorkers)
          .next(singleFiledWorkerMock)
          .put(actionAddFoodCreator(singleFiledWorkerMock.length * gameConfigMock.fieldProductionPerWorkerRatio))
          .next()
          .select(config.getGameConfig) // new cycle
          .finish()
    });

    it("Pokud není dostatek pracovníků není akce pro přidání jídla do skladiště dispatchnuta", () => {
      const noFiledWorkersMock: Array<IWorker> = [];
      testSaga(fieldProductionSaga)
          .next()
          .select(config.getGameConfig)
          .next(gameConfigMock)
          .delay(gameConfigMock.fieldProductionSeconds * 1000)
          .next()
          .select(workers.getFieldWorkers)
          .next(noFiledWorkersMock)
          .select(config.getGameConfig) //new cycle
          .finish()
    });
  })
});
