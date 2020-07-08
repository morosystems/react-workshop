import { IWorker, WorkOccupation } from "./types";

import {
  WORKER_HAS_EATEN,
  ADD_WORKERS,
  SET_WORKER_STARVING,
  SET_WORKER_PASSAWAY,
  UNASSING_WORKER_FROM_FIELD,
  UNASSING_WORKER_FROM_SAW,
  ASSING_UNEMPLOYED_WORKER_TO_WORK_OCCUPATION,
  WORKERS_HAS_ARRIVED
} from "./constants";

import {
  IUnassignWorkerFromSawAction,
  IUnassignWorkerFromFieldAction,
  IAssignUnemployedWorkerToWorkOccupationAction,
  ISetWorkerStarvingAction,
  ISetWorkerPassawayAction,
  IAddWorkersAction,
  IWorkerHasEatenAction,
  IWorkersHasArrivedAction
} from "./types";

export const actionWorkerHasEatenCreator = (
  workerId: string
): IWorkerHasEatenAction => ({
  type: WORKER_HAS_EATEN,
  payload: { workerId }
});

export const actionSetWorkerStarvingCreator = (
  workerId: string
): ISetWorkerStarvingAction => ({
  type: SET_WORKER_STARVING,
  payload: { workerId }
});

export const actionSetWorkerPassawayCreator = (
  workerId: string
): ISetWorkerPassawayAction => ({
  type: SET_WORKER_PASSAWAY,
  payload: { workerId }
});

export const actionAddWorkersCreator = (
  workers: Array<IWorker>
): IAddWorkersAction => ({
  type: ADD_WORKERS,
  payload: { workers }
});

export const actionAssignUnemployedWorkerToWorkOccupationCreator = (
  newWorkOccupation: WorkOccupation
): IAssignUnemployedWorkerToWorkOccupationAction => ({
  type: ASSING_UNEMPLOYED_WORKER_TO_WORK_OCCUPATION,
  payload: {
    newWorkOccupation
  }
});

export const actionUnAssignWorkerFromFieldCreator = (): IUnassignWorkerFromFieldAction => ({
  type: UNASSING_WORKER_FROM_FIELD
});

export const actionUnAssignWorkerFromSawCreator = (): IUnassignWorkerFromSawAction => ({
  type: UNASSING_WORKER_FROM_SAW
});

export const actionWorkersHasArrivedCreator = (): IWorkersHasArrivedAction => ({
  type: WORKERS_HAS_ARRIVED
});
