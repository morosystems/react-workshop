import { NAME } from "./constants";
import { reducer } from "./reducer";
import { getGameConfig, isDarkTheme } from "./selectors";
import {actionToggleDarkThemeCreator} from "./actions";
import { saga } from "./saga";

export const config = {
  NAME,
  reducer,
  saga,
  getGameConfig,
  isDarkTheme,
  actionToggleDarkThemeCreator,
};
