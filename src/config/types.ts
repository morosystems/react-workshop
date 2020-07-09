import { Action } from "redux";
import { TOGGLE_DARK_THEME } from "./constants";
import { IGameRules } from "types";

export interface IConfigState {
  isDarkTheme: boolean;
  gameRules: IGameRules;
}

export interface IToggleDarkThemeAction
  extends Action<typeof TOGGLE_DARK_THEME> {
}

export class GameRules implements IGameRules {
  workerGoal: number = 100;
  houseCapacity: number = 5;
  workerArrivalSeconds: number = 45;
  sawProductionSeconds: number = 30;
  sawProductionPerWorkerRatio: number = 1;
  fieldProductionSeconds: number = 30;
  fieldProductionPerWorkerRatio: number = 1;
  employedWorkerStarvationSeconds: number = 60;
  unEmployedWorkerStarvationSeconds: number = 80;
  houseWoodCost: number = 5;
  startingWorkers: number = 10;
  startingWorkerCapacity: number = 15;
}
