import React, { FunctionComponent } from "react";
import { bemClassNames } from "bemClassNames";

const classname = bemClassNames("ScreenTheme");

export type ScreenThemeProps = {
  children: React.ReactNode;
  isDarkTheme: boolean;
};

export const ScreenTheme: FunctionComponent<ScreenThemeProps> = ({
  children,
  isDarkTheme
}) => <div className={classname({ isDarkTheme })}>{children}</div>;
