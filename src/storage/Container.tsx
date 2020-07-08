import React, { FunctionComponent } from "react";
import { connect, MapStateToProps } from "react-redux";
import { ResourceItem, GridLayout } from "components";
import {ResourceType, NoneOwnProps, IState} from "types";
import { workers } from "workers";

import { getWoodAmount, getFoodAmount, getWorkerCapacity } from "./selectors";

type StorageComponentProps = {
  woodAmount: number;
  foodAmount: number;
  workerCount: number;
  workerCapacity: number;
};

/**
 * Úkol 3
 * 4. zapojení getWoodAmount, getFoodAmount, getWorkerCapacity  v src/storage/Container.tsx
 */
const StorageComponent: FunctionComponent<StorageComponentProps> = ({
  woodAmount,
  foodAmount,
  workerCount,
  workerCapacity
}) => (
  <GridLayout horizontalSpace={15}>
    <ResourceItem count={woodAmount} resourceType={ResourceType.wood} />
    <ResourceItem count={foodAmount} resourceType={ResourceType.food} />
    <ResourceItem
      count={workerCount}
      maxCount={workerCapacity}
      resourceType={ResourceType.worker}
    />
  </GridLayout>
);

type StateProps = Pick<
  StorageComponentProps,
  "woodAmount" | "foodAmount" | "workerCount" | "workerCapacity"
>;

const mapStateToProps: MapStateToProps<StateProps, NoneOwnProps, IState> = state => ({
    woodAmount: getWoodAmount(state),
    foodAmount: getFoodAmount(state),
    workerCount: workers.getWorkerCount(state),
    workerCapacity: getWorkerCapacity(state)
});

export const StorageContainer = connect(mapStateToProps)(StorageComponent);
