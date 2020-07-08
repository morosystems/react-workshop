import React, { FunctionComponent } from "react";
import { connect, MapStateToProps } from "react-redux";
import { WorkerListHeader } from "./WorkerListHeader";
import { WorkerList } from "./WorkerList";
import { i18n } from "i18n";
import {IState, NoneOwnProps} from "types";

import {IWorker} from "../types";
import { getUnEmployedWorkers } from "../selectors";

export type UnemployedWorkersProps = {
  workers: Array<IWorker>;
  msg: string;
};

/**
 * Úkol 2
 * 3. doplnění kontejneru src/workers/containers/UnemployedWorkers" bude zobrazovat přehled nezaměstnaných pracovníků
 *    - použití připravených komponent
 *        - WorkerListHeader - zobrazuje lokalizovaný nadpis, použijeme selektor i18n.getMessage(state, "unemployed")
 *        - WorkerList - zobrazuje jména nezměstnaných pracovníků, ty získáme ze stavu pomocí selektoru z definovaného v src/workers/selecectors.ts
 */
export const UnconnectedUnemployedWorkers: FunctionComponent<
  UnemployedWorkersProps
> = ({ workers, msg }) => {
  return (
    <div>
      <WorkerListHeader title={msg} />
      <WorkerList workers={workers} />
    </div>
  );
};

type StateProps = Pick<UnemployedWorkersProps, "workers" | "msg">;

const mapStateToProps: MapStateToProps<StateProps, NoneOwnProps, IState> = state => ({
    workers: getUnEmployedWorkers(state),
    msg: i18n.getMessage(state, "unemployed")
});

export const UnemployedWorkers = connect(mapStateToProps)(
  UnconnectedUnemployedWorkers
);
