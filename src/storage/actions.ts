import {
  ADD_WOOD,
  ADD_FOOD,
  REMOVE_FOOD,
  BUILD_HOUSE,
  SET_WORKER_CAPACITY
} from "./constants";

import {
  IAddWoodAction,
  IAddFoodAction,
  IRemoveFoodAction,
  IBuildHouseAction,
  ISetWorkerCapacityAction
} from "./types";

export const actionAddWoodCreator = (amount: number): IAddWoodAction => ({
  type: ADD_WOOD,
  payload: { amount }
});

export const actionAddFoodCreator = (amount: number): IAddFoodAction => ({
  type: ADD_FOOD,
  payload: { amount }
});

export const actionRemoveFoodCreator = (amount: number): IRemoveFoodAction => ({
  type: REMOVE_FOOD,
  payload: { amount }
});

export const actionBuildHouseCreator = (
  houseWorkerCapacity: number,
  houseWoodCost: number
): IBuildHouseAction => ({
  type: BUILD_HOUSE,
  payload: {
    houseWorkerCapacity,
    houseWoodCost
  }
});

export const actionSetWorkerCapacityCreator = (
  workerCapacity: number
): ISetWorkerCapacityAction => ({
  type: SET_WORKER_CAPACITY,
  payload: { workerCapacity }
});
