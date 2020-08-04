import React, { FunctionComponent } from "react";
import { GridLayout } from "components";

import {
  Menu,
  WorkersArrivalCounter,
  ThemeToggle,
  LocalizationOptionSwitch,
  BuildHouseButton
} from "./containers";

type MenuContainerProps = {
  storage: React.ReactElement;
};

export const MenuContainer: FunctionComponent<MenuContainerProps> = ({
  storage
}) => (
  <>
    <Menu
      leftContent={
        <GridLayout horizontalSpace={15}>
          {storage}
          <BuildHouseButton />
        </GridLayout>
      }
      rightContent={
        <GridLayout horizontalSpace={15} isVerticalCenter>
          <WorkersArrivalCounter />
          <LocalizationOptionSwitch />
          <ThemeToggle />
        </GridLayout>
      }
    />
  </>
);
