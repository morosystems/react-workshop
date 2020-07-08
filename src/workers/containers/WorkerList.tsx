import React, { FunctionComponent } from "react";
import { IWorker } from "../types";

export type WorkerListProps = {
  workers: Array<IWorker>;
};

export const WorkerList: FunctionComponent<WorkerListProps> = ({ workers }) => {
  return (
    <ul>
      {workers.map((worker: IWorker) => (
        <li key={worker.name}>{worker.name}</li>
      ))}
    </ul>
  );
};
