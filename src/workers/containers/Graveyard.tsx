import React, { FunctionComponent } from "react";
import { WorkerListHeader } from "./WorkerListHeader";
import { WorkerList } from "./WorkerList";
import { MapStateToProps, connect } from "react-redux";

import { i18n } from "i18n";
import {IState, NoneOwnProps} from "types";

import {IWorker} from "../types";
import { getPassedAwayWorkers } from "../selectors";

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
