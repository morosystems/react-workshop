import { Action } from "redux";
import {
  SET_WORKER_CAPACITY,
  ADD_WOOD,
  ADD_FOOD,
  REMOVE_FOOD,
  BUILD_HOUSE
} from "./constants";

export interface IStorage {
  woodAmount: number;
  foodAmount: number;
}

export interface IStorageState {
  readonly storage: IStorage;
  readonly workerCapacity: number;
}

export interface IAddWoodAction extends Action<typeof ADD_WOOD> {
  readonly payload: {
    readonly amount: number;
  };
}

export interface IAddFoodAction extends Action<typeof ADD_FOOD> {
  readonly payload: {
    readonly amount: number;
  };
}

export interface IRemoveFoodAction extends Action<typeof REMOVE_FOOD> {
  readonly payload: {
    readonly amount: number;
  };
}

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
