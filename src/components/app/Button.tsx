import classNames from "classnames";
import React, { ForwardedRef, RefObject } from "react";
export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}
type Button = {
  children: string | React.ReactNode;
  className?: string;
  disable?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;
const Button = React.forwardRef(
  (props: Button, ref: ForwardedRef<HTMLButtonElement>) => {
    const { children, className, disable, ...rest } = props;
    return (
      <button
        {...rest}
        ref={ref}
        className={classNames(
          "w-full max-w-md rounded-2xl bg-gray-200 py-4 text-center font-bold text-sky-600 shadow-md shadow-gray-600/20 backdrop-blur-sm last:mt-4 active:bg-gray-100 [&.disable]:text-gray-500 [&.disable]:opacity-90 ",
          className,
          { disable },
        )}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
