import React, { FunctionComponent } from "react";

export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
};

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  disabled
}) => (
  <button onClick={disabled ? () => {} : onClick} disabled={disabled}>
    {children}
  </button>
);
