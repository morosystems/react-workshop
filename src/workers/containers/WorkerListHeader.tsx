import React, { FunctionComponent } from "react";
import { GridLayout, Button } from "components";

export type WorkerListHeaderProps = {
  title: string;
  isAddDisabled?: boolean;
  isRemoveDisabled?: boolean;
  onAddClick?: () => void;
  onRemoveClick?: () => void;
};
export const WorkerListHeader: FunctionComponent<WorkerListHeaderProps> = ({
  title,
  isAddDisabled = true,
  isRemoveDisabled = true,
  onAddClick,
  onRemoveClick
}) => (
  <GridLayout isVerticalCenter horizontalSpace={5}>
    <h2>{title}</h2>
    {onAddClick && (
      <Button onClick={onAddClick} disabled={isAddDisabled}>
        +
      </Button>
    )}
    {onRemoveClick && (
      <Button onClick={onRemoveClick} disabled={isRemoveDisabled}>
        -
      </Button>
    )}
  </GridLayout>
);
