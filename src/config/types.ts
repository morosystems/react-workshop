import { Action } from "redux";
import { TOGGLE_DARK_THEME } from "./constants";
import { IGameConfig } from "types";

export interface IConfigState {
  isDarkTheme: boolean;
  gameConfig: IGameConfig;
}

export interface IToggleDarkThemeAction
  extends Action<typeof TOGGLE_DARK_THEME> {}

export class GameConfig implements IGameConfig {
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
