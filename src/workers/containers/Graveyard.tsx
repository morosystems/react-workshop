import React, { FunctionComponent } from "react";
import { WorkerListHeader, WorkerList } from "components";
import {IState, IWorker, NoneOwnProps} from "types";
import { MapStateToProps, connect } from "react-redux";
import { getPassedAwayWorkers } from "../selectors";
import { i18n } from "i18n";

export type GraveyardProps = {
  workers: Array<IWorker>;
  msg: string;
};

export const GraveyardComponent: FunctionComponent<GraveyardProps> = ({
  workers,
  msg
}) => {
  return (
    <div>
      <WorkerListHeader title={msg} />
      <WorkerList workers={workers} />
    </div>
  );
};

type StateProps = Pick<GraveyardProps, "workers" | "msg">;

const mapStateToProps: MapStateToProps<StateProps, NoneOwnProps, IState> = state => ({
  workers: getPassedAwayWorkers(state),
  msg: i18n.getMessage(state, "graveyard")
});

export const Graveyard = connect(mapStateToProps)(GraveyardComponent);
