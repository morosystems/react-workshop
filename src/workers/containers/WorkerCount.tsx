import React, { FunctionComponent } from "react";

export type WorkerCountProps = {
  count: number;
};

export const WorkerCount: FunctionComponent<WorkerCountProps> = ({
  count
}) => {
  return <span>{count}</span>;
};
