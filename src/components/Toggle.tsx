import React, {ChangeEvent, FunctionComponent} from "react";
import ReactToggle from "react-toggle";

export type ToggleProps = {
  defaultChecked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  icons?: boolean;
};

export const Toggle: FunctionComponent<ToggleProps> = ({defaultChecked,onChange, icons= false}) => (
  <ReactToggle icons={icons} onChange={onChange} defaultChecked={defaultChecked} />
);
