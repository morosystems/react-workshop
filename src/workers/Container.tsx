import React, { FunctionComponent } from "react";

import { GridLayout } from "components";
import {
  ScreenTheme,
  UnemployedWorkers,
  FieldWorkers,
  SawWorkers,
  Graveyard
} from "./containers";

type ScreenContainerProps = {};

export const WorkersContainer: FunctionComponent<ScreenContainerProps> = () => {
  return (
    <ScreenTheme>
      <GridLayout horizontalSpace={20} isFullWidth>
        <UnemployedWorkers />
        <FieldWorkers />
        <SawWorkers />
        <Graveyard />
      </GridLayout>
    </ScreenTheme>
  );
};
