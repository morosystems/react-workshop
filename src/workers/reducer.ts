import { Reducer } from "redux";
import { produce } from "immer";
import { IWorker, WorkOccupation } from "./types";
import {
  ADD_WORKERS,
  SET_WORKER_STARVING,
  SET_WORKER_PASSAWAY,
  UNASSING_WORKER_FROM_FIELD,
  UNASSING_WORKER_FROM_SAW,
  WORKER_HAS_EATEN,
  ASSING_UNEMPLOYED_WORKER_TO_WORK_OCCUPATION
} from "./constants";

const workers: Reducer<Array<IWorker>> = (state = [], action) => {
  if (action.type === ADD_WORKERS) {
    return produce(state, draft => {
      return draft.concat(action.payload.workers);
    });
  } else if (action.type === SET_WORKER_STARVING) {
    return produce(state, draft => {
      const workerIndex = draft.findIndex(
        worker => worker.id === action.payload.workerId
      );
      draft[workerIndex] = Object.assign(draft[workerIndex], {
        isStarving: true
      });
    });
  } else if (action.type === SET_WORKER_PASSAWAY) {
    return produce(state, draft => {
      const workerIndex = draft.findIndex(
        worker => worker.id === action.payload.workerId
      );
      draft[workerIndex] = Object.assign(draft[workerIndex], {
        hasPassed: true
      });
    });
  } else if (action.type === ASSING_UNEMPLOYED_WORKER_TO_WORK_OCCUPATION) {
    return produce(state, draft => {
      const unemployedWorkerIndex = draft.findIndex(
        (worker: IWorker) => worker.workOccupation === WorkOccupation.unemployed
      );
      if (unemployedWorkerIndex > -1) {
        draft[unemployedWorkerIndex] = Object.assign(
          draft[unemployedWorkerIndex],
          { workOccupation: action.payload.newWorkOccupation }
        );
      }
    });
  } else if (action.type === UNASSING_WORKER_FROM_FIELD) {
    return produce(state, draft => {
      const unFieldWorkerIndex = draft.findIndex(
        (worker: IWorker) => worker.workOccupation === WorkOccupation.field
      );
      if (unFieldWorkerIndex > -1) {
        draft[unFieldWorkerIndex] = Object.assign(draft[unFieldWorkerIndex], {
          workOccupation: WorkOccupation.unemployed
        });
      }
    });
  } else if (action.type === UNASSING_WORKER_FROM_SAW) {
    return produce(state, draft => {
      const unFieldWorkerIndex = draft.findIndex(
        (worker: IWorker) => worker.workOccupation === WorkOccupation.saw
      );
      if (unFieldWorkerIndex > -1) {
        draft[unFieldWorkerIndex] = Object.assign(draft[unFieldWorkerIndex], {
          workOccupation: WorkOccupation.unemployed
        });
      }
    });
  } else if (action.type === WORKER_HAS_EATEN) {
    return produce(state, draft => {
      const workerIndex = draft.findIndex(
        worker => worker.id === action.payload.workerId
      );
      draft[workerIndex] = Object.assign(draft[workerIndex], {
        isStarving: false
      });
    });
  } else {
    return state;
  }
};

export const reducer = workers;
