import { Selector } from "react-redux";
import { IGameRules, IState } from "types";
import {IConfigState} from "./types";
import {getGameModel} from "../selectors";

export const getModule: Selector<IState, IConfigState> = (state) => {
  return getGameModel(state).config;
};

export const isDarkTheme: Selector<IState, boolean> = (state) => {
  return getModule(state).isDarkTheme;
};

export const getGameRules: Selector<IState, IGameRules> = state => {
  return getModule(state).gameRules;
};

export const getWorkerGoal: Selector<IState, number> = state => {
  return getGameRules(state).workerGoal;
};
