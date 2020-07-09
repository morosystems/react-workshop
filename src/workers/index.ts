import { WorkersContainer as Container } from "./Container";
import { NAME } from "./constants";
import { reducer } from "./reducer";
import { saga } from "./saga";
import { getSawWorkers, getFieldWorkers, getWorkerCount } from "./selectors";
import { actionWorkersHasArrivedCreator } from "./actions";
import { Gender, WorkOccupation } from "./types";

/**
 * Ukol 2
 * 1. definice rozhraní v souboru /src/workers/index.ts
 *    - exportujme modul - používáme named exporty export const workers = { ... }
 *    - je třeba exportovat NAME (název modulu uložený v konstantách), ságu, reducer a Container
 */
export const workers = {
  NAME,
  Container,
  reducer,
  saga,
  getSawWorkers,
  getFieldWorkers,
  getWorkerCount,
  actionWorkersHasArrivedCreator,
  Gender,
  WorkOccupation
};
