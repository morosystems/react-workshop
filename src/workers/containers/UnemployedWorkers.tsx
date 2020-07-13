import React, { FunctionComponent } from "react";

import {IWorker} from "../types";

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
> = () => {
  return (
    <div>
    </div>
  );
};

export const UnemployedWorkers = UnconnectedUnemployedWorkers; //;
