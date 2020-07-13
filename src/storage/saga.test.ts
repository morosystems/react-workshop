import { fork } from "redux-saga/effects";
import {expectSaga, testSaga} from "redux-saga-test-plan";
import {EffectProviders, StaticProvider} from "redux-saga-test-plan/providers";

import { config } from "config";
import {
  actionAddFoodCreator,
  actionAddWoodCreator,
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

  /**
   * 4. otestujeme ságy
   * integrační test
   *  - pomocí expectSaga provedeme integrační test hlavní ságy
   *  - definujeme providery v rootSagaProviders
   *  - provider je pole, kde první prvek pole je daný efekt a druhý jsou jeho parametry (pokud nepředáváme parametry nastavíme druhý prvek na null)
   *  - nastavíme providery expect ságy pomocí .provide(rootSagaProviders)
   *  - otestujeme dílčí efekty nad expect ságou
   *  - nakonec zavoláme .silentRun() abychom se vyhli warningů ohledně nekonečného cyklu
   */
  it("po spuštění zavolá ságy pro inicializaci skladiště a produkci surovin", () => expectSaga(saga)
      .provide(rootSagaProviders)
      .fork(initStorageSaga)
      .fork(fieldProductionSaga)
      .fork(sawProductionSaga)
      .silentRun()
  );

  /**
   * 4. otestujeme ságy
   * jednotkový test
   *  - pomocí testSaga provedeme jednotkový test initStorageSaga
   *  - na začátku testu je třeba napsat .next()
   *  - otestujeme dané efekty, select, put, delay..
   *  - každý další efekt krokujeme pomocí next
   *  - pokud potřebujem předat výsledek do proměnné předáme jako parametr následujícího .next()
   *  - ujistíme se že sága doběhla pomocí .isDone()
   */
  describe("sága pro inicializaci skladiště", () => {
    const gameConfigMock = {startingWorkerCapacity: 100};
    it("načte ze store konfiguraci hry a dispatchne akci pro nastavení kapacity pracovníků", () => {
      testSaga(initStorageSaga)
              .next()
              .select(config.getGameRules)
              .next(gameConfigMock)
              .put(actionSetWorkerCapacityCreator(gameConfigMock.startingWorkerCapacity))
              .next()
              .isDone()
    });
  })

  /**
   * 4. otestujeme ságy
   *  - pomocí testSaga provedeme jednotkový test initStorageSaga
   *  - na začátku testu je třeba napsat .next()
   *  - otestujeme dané efekty, select, put, delay..
   *  - každý další efekt krokujeme pomocí next
   *  - pokud potřebujem předat výsledek do proměnné předáme jako parametr následujícího .next()
   *  - pokud je sága v nekončeném cyklu, testujeme jeden cyklus a ukončíme ji pomocí .finish()
   */
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
          .select(config.getGameRules)
          .next(gameConfigMock)
          .delay(gameConfigMock.fieldProductionSeconds * 1000)
          .next()
          .select(workers.getFieldWorkers)
          .next(singleFiledWorkerMock)
          .put(actionAddFoodCreator(singleFiledWorkerMock.length * gameConfigMock.fieldProductionPerWorkerRatio))
          .next()
          .select(config.getGameRules) // new cycle
          .finish()
    });

    it("Pokud není dostatek pracovníků, akce pro přidání jídla do skladiště není dispatchnuta", () => {
      const noFiledWorkersMock: Array<IWorker> = [];
      testSaga(fieldProductionSaga)
          .next()
          .select(config.getGameRules)
          .next(gameConfigMock)
          .delay(gameConfigMock.fieldProductionSeconds * 1000)
          .next()
          .select(workers.getFieldWorkers)
          .next(noFiledWorkersMock)
          .select(config.getGameRules) //new cycle
          .finish()
    });
  })

  /**
   * 4. otestujeme ságy
   * jednotkový test
   *  - pomocí testSaga provedeme jednotkový test initStorageSaga
   *  - na začátku testu je třeba napsat .next()
   *  - otestujeme dané efekty, select, put, delay..
   *  - každý další efekt krokujeme pomocí next
   *  - pokud potřebujem předat výsledek do proměnné předáme jako parametr následujícího .next()
   *  - ujistíme se že sága doběhla pomocí .isDone()
   */
  describe("sága pro produkci dřeva na pile", () => {
      const gameConfigMock = {sawProductionSeconds: 1, sawProductionPerWorkerRatio: 5};
      it("Pokud jsou na pile pracovníci, tak po dané prodlevě dipatchuje akci pro přidání dřeva do skladiště", () => {
        const singleSawWorkerMock: Array<IWorker> = [{
          id: "0x0",
          name: "rollin",
          gender: workers.Gender.female,
          workOccupation: workers.WorkOccupation.saw,
          description: 'stone',
          isStarving: false,
          hasPassed: false,
        }];
        testSaga(sawProductionSaga)
            .next()
            .select(config.getGameRules)
            .next(gameConfigMock)
            .delay(gameConfigMock.sawProductionSeconds * 1000)
            .next()
            .select(workers.getSawWorkers)
            .next(singleSawWorkerMock)
            .put(actionAddWoodCreator(singleSawWorkerMock.length * gameConfigMock.sawProductionPerWorkerRatio))
            .next()
            .select(config.getGameRules) // new cycle
            .finish()
      });

      it("Pokud není dostatek pracovníků, akce pro přidání jídla do skladiště není dispatchnuta", () => {
        const noFiledWorkersMock: Array<IWorker> = [];
        testSaga(sawProductionSaga)
            .next()
            .select(config.getGameRules)
            .next(gameConfigMock)
            .delay(gameConfigMock.sawProductionSeconds * 1000)
            .next()
            .select(workers.getSawWorkers)
            .next(noFiledWorkersMock)
            .select(config.getGameRules) //new cycle
            .finish()
      });
  })
});
