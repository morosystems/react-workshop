import React, { FunctionComponent } from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";

import { WorkerListHeader } from "./WorkerListHeader";
import { WorkerList } from "./WorkerList";
import { i18n } from "i18n";
import {IState, NoneOwnProps} from "types";

import {IWorker, WorkOccupation} from "../types";
import { getSawWorkers, getUnEmployedWorkers } from "../selectors";
import {
  actionAssignUnemployedWorkerToWorkOccupationCreator,
  actionUnAssignWorkerFromFieldCreator
} from "../actions";

export type SawWorkersProps = {
  workers: Array<IWorker>;
  msg: string;
  isAddDisabled: boolean;
  onAddClick: () => void;
  onRemoveClick: () => void;
};

export const SawWorkersComponent: FunctionComponent<SawWorkersProps> = ({
  workers,
  msg,
  isAddDisabled,
  onAddClick,
  onRemoveClick
}) => {
  return (
    <div>
      <WorkerListHeader
        title={msg}
        onAddClick={onAddClick}
        isAddDisabled={isAddDisabled}
        onRemoveClick={onRemoveClick}
        isRemoveDisabled={workers.length <= 0}
      />
      <WorkerList workers={workers} />
    </div>
  );
};

type StateProps = Pick<SawWorkersProps, "msg" | "workers" | "isAddDisabled">;

const mapStateToProps: MapStateToProps<StateProps, NoneOwnProps, IState> = state => ({
  workers: getSawWorkers(state),
  msg: i18n.getMessage(state, "saw"),
  isAddDisabled: getUnEmployedWorkers(state).length <= 0
});

type DispatchProps = Pick<SawWorkersProps, "onAddClick" | "onRemoveClick">;

const mapDispatchToProps: MapDispatchToProps<
  DispatchProps,
  NoneOwnProps
> = dispatch => ({
  onAddClick: () =>
    dispatch(
      actionAssignUnemployedWorkerToWorkOccupationCreator(WorkOccupation.saw)
    ),
  onRemoveClick: () => dispatch(actionUnAssignWorkerFromFieldCreator())
});

export const SawWorkers = connect(
  mapStateToProps,
  mapDispatchToProps
)(SawWorkersComponent);
