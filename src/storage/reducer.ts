import { combineReducers, Reducer } from "redux";
import { produce } from "immer";
import { IStorageState, IStorage } from "./types";
import {
  ADD_FOOD,
  ADD_WOOD,
  SET_WORKER_CAPACITY,
  REMOVE_FOOD,
  BUILD_HOUSE
} from "./constants";

/**
 * Úkol 3
 * 2. v souboru  src/resources/reducer.ts doplnění defaultních hodnot pro reducery storage a workerCapacity
 * 7. aplikování akcí v src/resources/reducer.ts (pozor na mutace!)
 */
const storage: Reducer<IStorage> = (
  state = { woodAmount: 0, foodAmount: 0 },
  action
) => {
  if (action.type === ADD_FOOD) {
    return produce(state, draft => {
      draft.foodAmount += action.payload.amount;
    });
  } else if (action.type === REMOVE_FOOD) {
    return produce(state, draft => {
      draft.foodAmount = Math.min(draft.foodAmount - action.payload.amount, 0);
    });
  } else if (action.type === ADD_WOOD) {
    return produce(state, draft => {
      draft.woodAmount += action.payload.amount;
    });
  } else if (action.type === BUILD_HOUSE) {
    return produce(state, draft => {
      draft.woodAmount -= action.payload.houseWoodCost;
    });
  } else {
    return state;
  }
};

const workerCapacity: Reducer<number> = (state = 0, action) => {
  if (action.type === SET_WORKER_CAPACITY) {
    return action.payload.workerCapacity;
  } else if (action.type === BUILD_HOUSE) {
    return state + action.payload.houseWorkerCapacity;
  } else {
    return state;
  }
};

export const reducer: Reducer<IStorageState> = combineReducers({
  storage,
  workerCapacity
});
