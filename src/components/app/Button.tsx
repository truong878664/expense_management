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
          "bg-gray-20 w-full max-w-md border-t bg-[#efeff1] py-4 text-center font-bold text-sky-600 shadow-md shadow-gray-600/20 backdrop-blur-sm first:rounded-t-2xl first:border-t-0 last:mt-4 last:rounded-2xl active:bg-gray-100  [&.disable]:text-gray-500 [&.disable]:opacity-90 [&:nth-last-child(2)]:rounded-b-2xl [&:nth-last-child(2)]:border-b",
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
