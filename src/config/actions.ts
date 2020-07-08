import { TOGGLE_DARK_THEME } from "./constants";
import { IToggleDarkThemeAction } from "./types";

export const actionToggleDarkThemeCreator = (): IToggleDarkThemeAction => ({
  type: TOGGLE_DARK_THEME
});
