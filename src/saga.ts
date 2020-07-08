import { fork, all } from "redux-saga/effects";
import { Saga } from "redux-saga";
import { i18n } from "./i18n";
import { workers } from "./workers";
import { storage } from "./storage";
import { config } from "./config";

export const saga: Saga = function* saga() {
  yield all([fork(config.saga), fork(i18n.saga)]);
  yield all([fork(storage.saga), fork(workers.saga)]);
};
