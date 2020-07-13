import { Selector } from "react-redux";
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
