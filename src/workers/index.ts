import {actionWorkersHasArrivedCreator} from "./actions";
import {getWorkerCount} from "./selectors";
import {Gender, WorkOccupation} from "./types";
/**
 * Ukol 2
 * 1. definice rozhraní v souboru /src/workers/index.ts
 *    - exportujme modul - používáme named exporty export const workers = { ... }
 *    - je třeba exportovat NAME (název modulu uložený v konstantách), ságu, reducer a Container
 */

export const workers = {
    actionWorkersHasArrivedCreator,
    getWorkerCount,
    Gender,
    WorkOccupation,
};
