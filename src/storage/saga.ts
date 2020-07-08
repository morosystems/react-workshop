import { put, delay, fork, select } from "redux-saga/effects";

import { Saga, SagaIterator } from "redux-saga";
import { config } from "config";
import {
  actionAddFoodCreator,
  actionAddWoodCreator,
  actionSetWorkerCapacityCreator
} from "./actions";
import { workers } from "workers";

export const saga: Saga = function* saga(): SagaIterator {
  yield fork(initStorageSaga);
  yield fork(fieldProductionSaga);
  yield fork(sawProductionSaga);
};

export const initStorageSaga: Saga = function* initStotageSaga(): SagaIterator  {
  const gameConfig: ReturnType<typeof config.getGameConfig> = yield select(
    config.getGameConfig
  );
  yield put(actionSetWorkerCapacityCreator(gameConfig.startingWorkerCapacity));
};

/**
 * Úkol 4
 * 2. sagy pro dřevo/jídlo budou mít stejné chování, jen počítat s jinými hodnotami
 * 3. v nekonečném cyklu budem opakovat
 *    - načtení aktuální konfigurace z config.getGameConfig
 *    - pomocí effektu delay počkáme daný počet milisekund (je potřeba převést hodnotu z konfigurace z sekund na ms)
 *    - ze stavu vyberem aktuální pracovníků na dané pozici
 *    - pokud jsou na dané pozici nějácí pracovníci přidáme tolik suroviny kolik je pracovníků
 */
export const fieldProductionSaga: Saga = function* workerEatingLoopSaga(): SagaIterator {
  while (true) {
    const gameConfig: ReturnType<typeof config.getGameConfig> = yield select(
      config.getGameConfig
    );
    yield delay(gameConfig.fieldProductionSeconds * 1000);
    const filedWorkers: ReturnType<
      typeof workers.getFieldWorkers
    > = yield select(workers.getFieldWorkers);
    if (filedWorkers.length > 0)
      yield put(
        actionAddFoodCreator(
          filedWorkers.length * gameConfig.fieldProductionPerWorkerRatio
        )
      );
  }
};

export const sawProductionSaga: Saga = function* workerEatingLoopSaga(): SagaIterator {
  while (true) {
    const gameConfig: ReturnType<typeof config.getGameConfig> = yield select(
      config.getGameConfig
    );
    yield delay(gameConfig.sawProductionSeconds * 1000);
    const sawWorkers: ReturnType<typeof workers.getSawWorkers> = yield select(
      workers.getSawWorkers
    );
    if (sawWorkers.length > 0)
      yield put(
        actionAddWoodCreator(
          sawWorkers.length * gameConfig.sawProductionPerWorkerRatio
        )
      );
  }
};
