import React, { FunctionComponent } from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { DecreasingSecondCounter } from "components";
import { config } from "config";
import {IState, NoneOwnProps} from "types";
import { workers } from "workers";
import { i18n } from "i18n";

type WorkersArrivalCounterProps = {
  workerArrivalSeconds: number;
  isDarkTheme: boolean;
  onCounterReset: () => void;
  msg: string;
};

const WorkersArrivalCounter: FunctionComponent<WorkersArrivalCounterProps> = ({
  workerArrivalSeconds,
  isDarkTheme,
  msg,
  onCounterReset
}) => {
  return (
    <DecreasingSecondCounter
      startValue={workerArrivalSeconds}
      onCounterReset={onCounterReset}
      msg={msg}
      isDarkTheme={isDarkTheme}
    />
  );
};

type StateProps = Pick<
  WorkersArrivalCounterProps,
  "isDarkTheme" | "workerArrivalSeconds" | "msg"
>;

const mapStateToProps: MapStateToProps<StateProps, NoneOwnProps, IState> = state => ({
  workerArrivalSeconds: config.getGameRules(state).workerArrivalSeconds,
  isDarkTheme: config.isDarkTheme(state),
  msg: i18n.getMessage(state, "secondsToWorkersArraival")
});

type DispatchProps = Pick<WorkersArrivalCounterProps, "onCounterReset">;

const mapDispatchToProps: MapDispatchToProps<
  DispatchProps,
  NoneOwnProps
> = dispatch => ({
  onCounterReset: () => dispatch(workers.actionWorkersHasArrivedCreator())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkersArrivalCounter);
