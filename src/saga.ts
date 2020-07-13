import { fork, all } from "redux-saga/effects";
import { Saga } from "redux-saga";
import { i18n } from "./i18n";
import { config } from "./config";

/**
 * Ukol 2
 * 1. zapojení modulu workers
 *    - v src/saga je potřeba spustit ságu exportovanou workers modulem
 * Ukol 3
 * 9. zapojení modulu storage
 *    - v src/saga je potřeba spustit ságu exportovanou workers modulem
 */
export const saga: Saga = function* saga() {
  //core sagas
  yield all([
    fork(config.saga),
    fork(i18n.saga),
  ]);

  //business module sagas
  yield all([
    // TODO fork(workers.saga),
    // TODO fork(storage.saga),
  ]);
};
