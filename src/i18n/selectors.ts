import { Selector } from "react-redux";

import { IState, Locale } from "types";

import { NAME } from "./constants";
import { Ii18nState } from "./types";
import {getGameModel} from "../selectors";

/**
 * Získá z globálního stavu podstrom patřící i18n modulu.
 */
const getModel: Selector<IState, Ii18nState> = state => getGameModel(state)[NAME];


/**
 * Získá lokalizační hodnotu pro zadaný klíč. Vrací undefined, pokud nebyla hodnota nalezena.
 */
export const getMessage: Selector<IState, string, string> = (
  state,
  locKey
) => getModel(state).localeMessages[locKey];

/**
 * Získá aktuálně nastavený kód jazyka aplikace..
 */
export const getLocaleCode: Selector<IState, Locale> = state =>
  getModel(state).localeCode;
