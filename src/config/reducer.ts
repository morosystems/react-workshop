import { combineReducers, Reducer } from "redux";
import { IGameConfig } from "types";
import { GameConfig, IConfigState } from "./types";
import { TOGGLE_DARK_THEME } from "./constants";

const isDarkTheme: Reducer<boolean> = (state = true, action) => {
  if (action.type === TOGGLE_DARK_THEME) {
    return !state;
  } else {
    return state;
  }
};

const gameConfig: Reducer<IGameConfig> = (state = new GameConfig(), action) => {
  return state;
};
export const reducer: Reducer<IConfigState> = combineReducers({
  isDarkTheme,
  gameConfig,
});
