import React, { FunctionComponent } from "react";
import { IWorker } from "types";

export type WorkerCountProps = {
  workers: Array<IWorker>;
};

export const WorkerCount: FunctionComponent<WorkerCountProps> = ({
  workers
}) => {
  return <span />;
};
