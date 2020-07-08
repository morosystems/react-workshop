import { Saga, SagaIterator } from "redux-saga";
import { takeEvery, put, call } from "redux-saga/effects";

import { SET_LOCALE_CODE } from "./constants";
import { ISetLocaleCodeAction } from "./types";
import { messages } from "./messages";
import {
  createSetLocaleCodeAction,
  createSetLocaleMessagesAction
} from "./actions";
import { Locale } from "types";

export const saga: Saga = function* i18nSaga(): SagaIterator {
  //yield put(createSetLocaleCodeAction(Locale.EN));
  yield call(loadLocaleMessagesSaga, createSetLocaleCodeAction(Locale.EN));
  yield takeEvery(SET_LOCALE_CODE, loadLocaleMessagesSaga);
};

/**
 * Obsluhuje požadavky na načtení dat pro lokalizační klíče. Načtené lokalizační položky doplní k ostatním položkám ve stavu.
 */
export const loadLocaleMessagesSaga: Saga = function* loadLocalizationKeysSaga(
  action: ISetLocaleCodeAction
): SagaIterator {
  yield put(
    createSetLocaleMessagesAction(
      messages[action.payload.localeCode].translation
    )
  );
};
