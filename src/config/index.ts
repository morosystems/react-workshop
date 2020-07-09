import { NAME } from "./constants";
import { reducer } from "./reducer";
import { getGameRules, isDarkTheme } from "./selectors";
import {actionToggleDarkThemeCreator} from "./actions";
import { saga } from "./saga";

export const config = {
  NAME,
  reducer,
  saga,
  getGameConfig: getGameRules,
  isDarkTheme,
  actionToggleDarkThemeCreator,
};
