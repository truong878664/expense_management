import classNames from "classnames";
import { ReactNode } from "react";

type HeaderExpense = {
  title?: string;
  handleLeft: {
    callback: () => void;
    classNameButtonLeft?: string;
    title: string | ReactNode;
    [rest: string]: any;
  };
  handleRight: {
    callback: () => void;
    title: string | ReactNode;
    classNameButtonRight?: string;
    [rest: string]: any;
  };
};

function HeaderExpense({ title, handleLeft, handleRight }: HeaderExpense) {
  const {
    title: titleLeft,
    callback: callbackLeft,
    classNameButtonLeft,
    ...restHandleLeft
  } = handleLeft;
  const {
    title: titleRight,
    callback: callbackRight,
    classNameButtonRight,
    ...restHandleRight
  } = handleRight;
  return (
    <div className="sticky top-0 mb-2 flex justify-between border-b bg-slate-100 font-bold capitalize">
      <button
        {...restHandleLeft}
        onClick={callbackLeft}
        className={classNames("px-4 py-2", classNameButtonLeft)}
      >
        {titleLeft}
      </button>
      <span>{title}</span>
      <button
        {...restHandleRight}
        className={classNames(
          "px-4 py-2 disabled:pointer-events-none disabled:opacity-50",
          classNameButtonRight,
        )}
        onClick={callbackRight}
      >
        {titleRight}
      </button>
    </div>
  );
}

export default HeaderExpense;
