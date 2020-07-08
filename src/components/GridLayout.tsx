import React, { FunctionComponent } from "react";

export type GridLayoutProps = {
  children: React.ReactNode;
  horizontalSpace?: Number;
  verticalSpace?: Number;
  gridTemplateAreas?: string;
  isVerticalCenter?: boolean;
  isFullWidth?: boolean;
};

export const GridLayout: FunctionComponent<GridLayoutProps> = ({
  children,
  horizontalSpace = 0,
  verticalSpace = 0,
  isVerticalCenter = false,
  isFullWidth = false,
  gridTemplateAreas
}) => (
  <div
    style={{
      display: "grid",
      gridAutoFlow: "column",
      columnGap: `${horizontalSpace}px`,
      rowGap: `${verticalSpace}px`,
      alignItems: isVerticalCenter ? "center" : "initial",
      gridTemplateAreas,
      width: isFullWidth ? "100%" : "auto"
    }}
  >
    {children}
  </div>
);
