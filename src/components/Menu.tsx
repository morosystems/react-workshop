import React, { FunctionComponent } from "react";
import { bemClassNames } from "bemClassNames";

const classname = bemClassNames("Menu");

export type MenuProps = {
    leftContent: React.ReactElement;
    rightContent: React.ReactElement;
    isDarkTheme: boolean;
};

export const Menu: FunctionComponent<MenuProps> = ({
    leftContent,
    rightContent,
    isDarkTheme
}) => (
    <div className={classname({ isDarkTheme })}>
        <div className={classname("left-content")}>{leftContent}</div>
        <div className={classname("right-content")}>{rightContent}</div>
    </div>
);
