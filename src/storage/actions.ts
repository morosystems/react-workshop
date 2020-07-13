import {ISetWorkerCapacityAction} from "./types";
import {SET_WORKER_CAPACITY} from "./constants";
/**
 * Úkol 3
 * 6. vytvoření action creatorů actionWoodProducedCreator(amount), actionFoodProducedCreator(amount), actionRemoveWoodCreator(amount), actionBuildHouseCreator(capacity, cost) v src/stroage/actions.ts
 *  - návratový typ action creatoru bude odpovídat interface z src/storage/types.ts (např. IWoodProducedAction)
 *  - typ akce bude konstanta z  src/storage/constants.ts
 */

export const actionSetWorkerCapacityCreator = (
    workerCapacity: number
): ISetWorkerCapacityAction => ({
  type: SET_WORKER_CAPACITY,
  payload: { workerCapacity }
});
