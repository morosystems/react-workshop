import React, { FunctionComponent } from "react";
import { bemClassNames } from "bemClassNames";

const classname = bemClassNames("Menu");

export type MenuProps = {
  leftContent: React.ReactNode;
  rightConent: React.ReactNode;
  isDarkTheme: boolean;
};

export const Menu: FunctionComponent<MenuProps> = ({
  leftContent,
  rightConent,
  isDarkTheme
}) => (
  <div className={classname({ isDarkTheme })}>
    <div className={classname("left-content")}>{leftContent}</div>
    <div className={classname("right-content")}>{rightConent}</div>
  </div>
);
