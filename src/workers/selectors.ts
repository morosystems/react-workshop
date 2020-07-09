import { Selector } from "react-redux";
import { produce } from "immer";
import { createSelector } from "reselect";
import { IState } from "types";
import { IWorker, WorkOccupation } from "./types";
import { IWorkersState } from "./types";
import {getGameModel} from "../selectors";

export const getModule: Selector<IState, IWorkersState> = state => {
  return getGameModel(state).workers;
};

export const getWorkerById: Selector<IState, IWorker | undefined, string> = (
  state,
  workerId
) => {
  return getModule(state).find(worker => worker.id === workerId);
};

export const getUnEmployedWorkers: Selector<
  IState,
  Array<IWorker>
> = createSelector(
    getModule,
  (workers: Array<IWorker>) =>
    produce(workers, draft =>
      draft.filter(
        (worker: IWorker) =>
          !worker.hasPassed &&
          worker.workOccupation === WorkOccupation.unemployed
      )
    )
);

export const getFieldWorkers: Selector<IState, Array<IWorker>> = createSelector(
    getModule,
  (workers: Array<IWorker>) =>
    produce(workers, draft =>
      draft.filter(
        (worker: IWorker) =>
          !worker.hasPassed && worker.workOccupation === WorkOccupation.field
      )
    )
);

export const getSawWorkers: Selector<IState, Array<IWorker>> = createSelector(
    getModule,
  (workers: Array<IWorker>) =>
    produce(workers, draft =>
      draft.filter(
        (worker: IWorker) =>
          !worker.hasPassed && worker.workOccupation === WorkOccupation.saw
      )
    )
);

export const getPassedAwayWorkers: Selector<
  IState,
  Array<IWorker>
> = createSelector(
    getModule,
  (workers: Array<IWorker>) =>
    produce(workers, draft =>
      draft.filter((worker: IWorker) => worker.hasPassed)
    )
);

export const getWorkerCount: Selector<IState, number> = createSelector(
    getModule,
  (workers: Array<IWorker>) =>
    workers.filter(worker => !worker.hasPassed).length
);

export const getAllWorkerCount: Selector<IState, number> = createSelector(
    getModule,
  (workers: Array<IWorker>) => workers.length
);
