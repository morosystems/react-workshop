import React, { FunctionComponent } from "react";
import { bemClassNames } from "bemClassNames";
import { ResourceType } from "types";

const classname = bemClassNames("ResourceItem");

export type ResourceItemProps = {
  count: Number;
  maxCount?: Number;
  resourceType: ResourceType;
};

export const ResourceItem: FunctionComponent<ResourceItemProps> = ({
  count,
  maxCount,
  resourceType
}) => (
  <span className={classname()}>
    <span className={classname("count")}>{count}</span>
    {maxCount !== undefined && (
      <>
        <span className={classname("separator")}>/</span>
        <span className={classname("max-count")}>{maxCount}</span>
      </>
    )}
    <span className={classname("resource-type")}>
      {ResourceType[resourceType]}
    </span>
  </span>
);
