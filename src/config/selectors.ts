import { Selector } from "react-redux";
import { IGameConfig, IState } from "types";
import { NAME } from "./constants";
import {IConfigState} from "./types";

export const getModule = (state: any): IConfigState => {
  return state[NAME];
};

export const isDarkTheme = (state: any): boolean => {
  return getModule(state).isDarkTheme;
};

export const getGameConfig: Selector<IState, IGameConfig> = state => {
  return getModule(state).gameConfig;
};

export const getWorkerGoal: Selector<IState, number> = state => {
  return getGameConfig(state).workerGoal;
};
