import React, { FunctionComponent } from "react";
import { bemClassNames } from "bemClassNames";
import { ISwitchOption } from "types";

const classname = bemClassNames("OptionSwitch");

export type OptionSwitchProps<T> = {
  options: Array<ISwitchOption>;
  selectedOptionId: T;
  onChange: (newSelectedOptionId: T) => void;
};

export const OptionSwitch: FunctionComponent<
  OptionSwitchProps<any>
> = ({ options, selectedOptionId, onChange }) => (
  <ul className={classname()}>
    {options.map(option => (
      <li
        key={option.id}
        className={classname("option", {
          selected: option.id === selectedOptionId
        })}
        onClick={() => onChange(option.id)}
      >
        {option.name}
      </li>
    ))}
  </ul>
);
