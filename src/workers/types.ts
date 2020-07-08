import { Action } from "redux";

import {
  ADD_WORKERS,
  ASSING_UNEMPLOYED_WORKER_TO_WORK_OCCUPATION,
  SET_WORKER_PASSAWAY,
  SET_WORKER_STARVING,
  UNASSING_WORKER_FROM_SAW,
  UNASSING_WORKER_FROM_FIELD,
  WORKER_HAS_EATEN,
  WORKERS_HAS_ARRIVED,
  SET_WORKER_CAPACITY,
  BUILD_HOUSE
} from "./constants";

export enum Gender {
  male = "M",
  female = "F"
}
export enum WorkOccupation {
  saw = "SAW",
  field = "FIELD",
  unemployed = "UNEMPLOYED"
}

export interface IWorker {
  id: string;
  name: string;
  gender: Gender;
  workOccupation: WorkOccupation;
  description: string;
  isStarving: boolean;
  hasPassed: boolean;
}

export interface IWorkersState extends Array<IWorker> {
  [key: string]: any;
}

export interface IAddWorkersAction extends Action<typeof ADD_WORKERS> {
  readonly payload: {
    readonly workers: Array<IWorker>;
  };
}

export interface ISetWorkerStarvingAction
  extends Action<typeof SET_WORKER_STARVING> {
  readonly payload: {
    readonly workerId: string;
  };
}

export interface ISetWorkerPassawayAction
  extends Action<typeof SET_WORKER_PASSAWAY> {
  readonly payload: {
    readonly workerId: string;
  };
}

export interface IAssignUnemployedWorkerToWorkOccupationAction
  extends Action<typeof ASSING_UNEMPLOYED_WORKER_TO_WORK_OCCUPATION> {
  readonly payload: {
    readonly newWorkOccupation: WorkOccupation;
  };
}

export interface IUnassignWorkerFromSawAction
  extends Action<typeof UNASSING_WORKER_FROM_SAW> {}

export interface IUnassignWorkerFromFieldAction
  extends Action<typeof UNASSING_WORKER_FROM_FIELD> {}

export interface IWorkerHasEatenAction extends Action<typeof WORKER_HAS_EATEN> {
  readonly payload: {
    readonly workerId: string;
  };
}

export interface IWorkersHasArrivedAction
  extends Action<typeof WORKERS_HAS_ARRIVED> {}

export interface ISetWorkerCapacityAction
  extends Action<typeof SET_WORKER_CAPACITY> {
  readonly payload: {
    readonly workerCapacity: number;
  };
}

export interface IBuildHouseAction extends Action<typeof BUILD_HOUSE> {
  readonly payload: {
    readonly houseWorkerCapacity: number;
    readonly houseWoodCost: number;
  };
}
