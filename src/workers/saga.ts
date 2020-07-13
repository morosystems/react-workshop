import {
  select,
  call,
  put,
  delay,
  fork,
  all,
  takeEvery
} from "redux-saga/effects";
import { Saga, SagaIterator } from "redux-saga";

import { config } from "config";
import { storage } from "storage";
import workersJSON from "workersData";
import { IGameRules} from "types";
import { IWorker, Gender, WorkOccupation } from "./types";
import { ADD_WORKERS, WORKERS_HAS_ARRIVED } from "./constants";
import { IAddWorkersAction } from "./types";
import {
  actionAddWorkersCreator,
  actionSetWorkerStarvingCreator,
  actionSetWorkerPassawayCreator,
  actionWorkerHasEatenCreator
} from "./actions";
import {
  getFieldWorkers,
  getSawWorkers,
  getWorkerById,
  getAllWorkerCount
} from "./selectors";

export const saga: Saga = function* saga(): SagaIterator {
  yield fork(initWorkersSaga);
  yield fork(fieldWorkersProductionSaga);
  yield fork(sawWorkersProductionSaga);

  yield takeEvery(ADD_WORKERS, runNewWorkersLifecicleSaga);
  yield takeEvery(WORKERS_HAS_ARRIVED, newWorkersArrivalSaga);
};

export const initWorkersSaga: Saga = function* initWorkersSaga(): SagaIterator {
  const gameRules: ReturnType<typeof config.getGameRules> = yield select(
    config.getGameRules
  );
  const workers: ReturnType<typeof parseWorkers> = yield call(parseWorkers);
  // mutation!
  yield put(
    actionAddWorkersCreator(workers.slice(0, gameRules.startingWorkers))
  );
};

export const runNewWorkersLifecicleSaga: Saga = function* runNewWorkersLifecicleSaga(
  action: IAddWorkersAction
): SagaIterator {
  const gameRules: ReturnType<typeof config.getGameRules> = yield select(
    config.getGameRules
  );
  const newWorkersEatingSagas = action.payload.workers.map(worker =>
    fork(workerEatingLoopSaga, gameRules, worker.id)
  );
  yield all(newWorkersEatingSagas);
};

export const workerEatingLoopSaga: Saga = function* workerEatingLoopSaga(
  gameRules: IGameRules,
  workerId: string
): SagaIterator {
  while (true) {
    yield delay(gameRules.unEmployedWorkerStarvationSeconds * 1000);
    const worker: ReturnType<typeof getWorkerById> = yield select(
      getWorkerById,
      workerId
    );

    if (worker === undefined) {
      throw new Error("workerEatingLoopSaga, worker is undefined");
    }
    const hasFood: ReturnType<typeof storage.hasStorageAnyFood> = yield select(
      storage.hasStorageAnyFood
    );
    if (hasFood) {
      yield put(storage.actionRemoveFoodCreator(1));
      yield put(actionWorkerHasEatenCreator(worker.id));
    } else {
      // Already starving -> pass away
      if (worker.isStarving) {
        yield put(actionSetWorkerPassawayCreator(worker.id));
      } else {
        yield put(actionSetWorkerStarvingCreator(worker.id));
      }
    }
  }
};

export const fieldWorkersProductionSaga: Saga = function* workerEatingLoopSaga(): SagaIterator {
  const gameRules: ReturnType<typeof config.getGameRules> = yield select(
    config.getGameRules
  );
  while (true) {
    yield delay(gameRules.fieldProductionSeconds * 1000);
    const filedWorkers: ReturnType<typeof getFieldWorkers> = yield select(
      getFieldWorkers
    );
    if (filedWorkers.length > 0)
      yield put(
        storage.actionAddFoodCreator(
          filedWorkers.length * gameRules.fieldProductionPerWorkerRatio
        )
      );
  }
};

export const sawWorkersProductionSaga: Saga = function* workerEatingLoopSaga(): SagaIterator {
  const gameRules: ReturnType<typeof config.getGameRules> = yield select(
    config.getGameRules
  );
  while (true) {
    yield delay(gameRules.sawProductionSeconds * 1000);
    const sawWorkers: ReturnType<typeof getSawWorkers> = yield select(
      getSawWorkers
    );
    if (sawWorkers.length > 0)
      yield put(
        storage.actionAddWoodCreator(
          sawWorkers.length * gameRules.sawProductionPerWorkerRatio
        )
      );
  }
};

export const newWorkersArrivalSaga: Saga = function* newWorkersArrivalSaga(): SagaIterator {
  const actualWorkersCount: ReturnType<typeof getAllWorkerCount> = yield select(
    getAllWorkerCount
  );
  const actualWorkersCapacity: ReturnType<
    typeof storage.getWorkerCapacity
  > = yield select(storage.getWorkerCapacity);
  const workers: ReturnType<typeof parseWorkers> = yield call(parseWorkers);
  // mutation!
  const arrivalWorkersCount = 3;
  const freeCapacity = actualWorkersCapacity - actualWorkersCount;
  const newWorkersCount =
    freeCapacity >= arrivalWorkersCount ? arrivalWorkersCount : freeCapacity;
  if (newWorkersCount > 0) {
    yield put(
      actionAddWorkersCreator(
        workers.slice(
          actualWorkersCount + 1,
          actualWorkersCount + 1 + newWorkersCount
        )
      )
    );
  }
};

//gender === 'M' ? Gender.male : Gender.female
const parseWorkers = (): Array<IWorker> => {
  return workersJSON.map(([gender, name, description]) => ({
    id: name,
    gender: gender as Gender,
    workOccupation: WorkOccupation.unemployed,
    name,
    description,
    isStarving: false,
    hasPassed: false
  }));
};
