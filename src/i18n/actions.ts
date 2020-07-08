import {Locale, TypedObject} from "types";

import {
  ISetLocaleCodeAction,
  ISetLocaleMessagesAction
} from "./types";
import { SET_LOCALE_MESSAGES, SET_LOCALE_CODE } from "./constants";

export const createSetLocaleCodeAction = (
  localeCode: Locale
): ISetLocaleCodeAction => ({
  type: SET_LOCALE_CODE,
  payload: {
    localeCode
  }
});

export const createSetLocaleMessagesAction = (
  localeMessages: TypedObject<string>
): ISetLocaleMessagesAction => ({
  type: SET_LOCALE_MESSAGES,
  payload: {
    localeMessages
  }
});
