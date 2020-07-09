import { Selector } from "react-redux";
import { createSelector } from "reselect";
import { IState } from "types";
import { IStorageState } from "./types";
import {getGameModel} from "../selectors";


export const getModule: Selector<IState, IStorageState> = (state) => {
  return getGameModel(state).storage;
};

/**
 * Úkol 3
 * 3. vytovoření selektorů getWoodAmount, getFoodAmount, getWorkerCapacity v src/storage/selectors.ts
 */

export const getFoodAmount: Selector<IState, number> = state => {
  return getModule(state).storage.foodAmount;
};

export const getWoodAmount: Selector<IState, number> = state => {
  return getModule(state).storage.woodAmount;
};
export const hasStorageAnyFood: Selector<IState, boolean> = createSelector(
  getFoodAmount,
  (foodAmount: number) => foodAmount > 0
);

export const getWorkerCapacity: Selector<IState, number> = state => {
  return getModule(state).workerCapacity;
};
