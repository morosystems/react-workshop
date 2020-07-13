import React, { FunctionComponent } from "react";
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
  MergeProps
} from "react-redux";
import { Button } from "components";
import { config } from "config";
import { storage } from "storage";
import { NoneOwnProps, IState } from "types";
import { i18n } from "i18n";

export type BuildHouseButtonProps = {
  onClick: () => void;
  disabled: boolean;
  msg: string;
};

const UnconnectedBuildHouseButton: FunctionComponent<BuildHouseButtonProps> = ({
  onClick,
  disabled,
  msg
}) => {
  return (
    <Button disabled={disabled} onClick={onClick}>
      {msg}
    </Button>
  );
};

type StateProps = {
  houseCapacity: number;
  houseWoodCost: number;
  disabled: boolean;
  msg: string;
};

const mapStateToProps: MapStateToProps<StateProps, NoneOwnProps, IState> = state => {
  const {houseCapacity, houseWoodCost} = config.getGameRules(state);
  return {
    houseCapacity,
    houseWoodCost,
    disabled: houseWoodCost > storage.getWoodAmount(state),
    msg: i18n.getMessage(state, "buildHouseButton")
  };
};

type DispatchProps = {
  onClick: (houseCapacity: number, houseWoodConst: number) => void;
};

const mapDispatchToProps: MapDispatchToProps<
  DispatchProps,
  NoneOwnProps
> = dispatch => ({
  onClick: (houseCapacity: number, houseWoodConst: number) =>
    dispatch(storage.actionBuildHouseCreator(houseCapacity, houseWoodConst))
});

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  NoneOwnProps,
  BuildHouseButtonProps
> = (
  { disabled, houseCapacity, houseWoodCost, msg },
  { onClick },
  ownProps
) => ({
  disabled,
  msg,
  onClick: () => onClick(houseCapacity, houseWoodCost),
  ...ownProps
});

export const BuildHouseButton = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UnconnectedBuildHouseButton);
