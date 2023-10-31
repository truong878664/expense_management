"use client";

import { extend } from "@/app/@modal/(.)add-expense/createExpenseSlice";
import CustomDate from "@/function/CDate";
import classNames from "classnames";
import { gsap } from "gsap";
import {
  MouseEventHandler,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import OptionSelectDate from "./OptionSelectDate";

type DateSelect = {
  handleRemove: (reactElement: null) => void;
};

function DateSelect({ handleRemove }: DateSelect) {
  const dateSelectRef: RefObject<HTMLDivElement> = useRef(null);
  const dispatch = useDispatch();
  const [optionDateComponent, setOptionDateComponent] =
    useState<ReactElement | null>(null);

  const classNameItemSelect = classNames(
    "w-full max-w-md rounded-2xl bg-gray-200 py-4 shadow-md shadow-black/20 last:mt-4",
  );

  useEffect(() => {
    gsap.fromTo(
      dateSelectRef.current,
      { translateY: "100%", opacity: 0 },
      { translateY: "0", duration: 0.2, opacity: 1 },
    );
  }, []);

  const onRemove = () => {
    gsap.fromTo(
      dateSelectRef.current,
      { translateY: "0", opacity: 1 },
      {
        translateY: "100%",
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          handleRemove(null);
        },
      },
    );
  };

  const onDispatchDate: MouseEventHandler = (e) => {
    const { minusDate } = (e.target as HTMLButtonElement).dataset;
    const { date, day, month, year } = new CustomDate().calculateDay(
      Number(minusDate),
    );
    dispatch(extend({ date, day, month, year }));
    onRemove();
  };

  const onOptionDate = {
    show() {
      setOptionDateComponent(
        <OptionSelectDate handleRemove={onOptionDate.remove} />,
      );
    },
    remove() {
      setOptionDateComponent(null);
      handleRemove(null);
    },
  };

  return (
    <>
      {optionDateComponent}
      <div
        id="date-select-wrapper"
        className="absolute left-0 top-0 grid h-full w-full items-end overflow-hidden rounded-t-3xl bg-white/10 text-center font-bold backdrop-blur-sm"
      >
        <div className="absolute-screen" onClick={onRemove}></div>
        <div
          ref={dateSelectRef}
          className="mb-6 flex w-full shrink flex-col items-center justify-center gap-3 px-1"
        >
          <button
            data-minus-date="-3"
            onClick={onOptionDate.show}
            className={classNameItemSelect}
          >
            Tùy chọn
          </button>
          <button
            data-minus-date="-2"
            onClick={onDispatchDate}
            className={classNameItemSelect}
          >
            Hôm kia
          </button>
          <button
            data-minus-date="-1"
            onClick={onDispatchDate}
            className={classNameItemSelect}
          >
            Hôm qua
          </button>
          <button
            data-minus-date="0"
            onClick={onDispatchDate}
            className={classNameItemSelect}
          >
            Hôm nay
          </button>
          <button onClick={onRemove} className={classNameItemSelect}>
            Hủy
          </button>
        </div>
      </div>
    </>
  );
}
export default DateSelect;
