import { Action } from "redux";

import { TypedObject, Locale } from "types";

import { SET_LOCALE_MESSAGES, SET_LOCALE_CODE } from "./constants";

export interface Ii18nState {
  readonly localeCode: Locale;
  readonly localeMessages: {
    readonly [key: string]: string,
  },
}

export interface ISetLocaleMessagesAction
  extends Action<typeof SET_LOCALE_MESSAGES> {
  readonly payload: {
    readonly localeMessages: TypedObject<string>;
  };
}

export interface ISetLocaleCodeAction extends Action<typeof SET_LOCALE_CODE> {
  readonly payload: {
    readonly localeCode: Locale;
  };
}
