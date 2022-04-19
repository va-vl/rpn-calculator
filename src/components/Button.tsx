import * as React from "react";
import type { BasicButtonData } from "../constants";

type ButtonProps = {
  className?: string;
  onClick?: (...args: any[]) => any;
} & BasicButtonData;

export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  keyCap
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      className={`button ${className || ""}`}
      onClick={(...clickArgs) => {
        if (onClick) {
          onClick(clickArgs);
        }
        ref.current?.blur();
      }}
    >
      {keyCap}
    </button>
  );
};
