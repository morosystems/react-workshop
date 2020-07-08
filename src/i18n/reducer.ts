import {combineReducers, Reducer} from "redux";

import { TypedObject, Locale } from "types";
import { SET_LOCALE_CODE, SET_LOCALE_MESSAGES } from "./constants";
import {Ii18nState} from "./types";

const localeCode: Reducer<Locale> = (state = Locale.EN, action) => {
  if (action.type === SET_LOCALE_CODE) {
    return action.payload.localeCode;
  } else {
    return state;
  }
};

export const localeMessages: Reducer<TypedObject<string>> = (
  state = {},
  action
) => {
  if (action.type === SET_LOCALE_MESSAGES) {
    return action.payload.localeMessages;
  } else {
    return state;
  }
};

export const reducer: Reducer<Ii18nState> = combineReducers({
  localeCode,
  localeMessages
});
