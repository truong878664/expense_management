"use client";

import { extend } from "@/app/@modal/(.)add-expense/createExpenseSlice";
import CustomDate from "@/function/CDate";
import { gsap } from "gsap";
import { CustomEase } from "gsap/all";
import { MouseEventHandler, RefObject, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

function DateSelect({
  handleRemove,
}: {
  handleRemove: (reactElement: null) => void;
}) {
  const dateSelectRef: RefObject<HTMLDivElement> = useRef(null);
  const dispatch = useDispatch();
  gsap.registerPlugin(CustomEase);
  CustomEase.create("navigator", ".51,-0.56,.52,1.55");
  useEffect(() => {
    gsap.fromTo(
      dateSelectRef.current,
      { translateY: "100%", opacity: 0 },
      { translateY: "0", duration: 0.5, opacity: 1, ease: "navigator" },
    );
  }, []);
  const onRemove = () => {
    gsap.fromTo(
      dateSelectRef.current,
      { translateY: "0", opacity: 1 },
      {
        translateY: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "navigator",

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

  return (
    <div
      id="date-select-wrapper"
      className="absolute left-0 top-0 grid h-full w-full items-end overflow-hidden rounded-t-3xl backdrop-blur-[1px]"
    >
      <div className="absolute-screen" onClick={onRemove}></div>
      <div
        ref={dateSelectRef}
        className="mb-6 flex w-full shrink flex-col gap-1 px-1"
      >
        <button
          data-minus-date="-2"
          onClick={onDispatchDate}
          className="rounded-2xl bg-stone-300/50 py-4 text-center font-bold shadow-sm backdrop-blur-sm"
        >
          Hôm kia
        </button>
        <button
          data-minus-date="-1"
          onClick={onDispatchDate}
          className="rounded-2xl bg-stone-300/50 py-4 text-center font-bold shadow-sm backdrop-blur-sm"
        >
          Hôm qua
        </button>
        <button
          data-minus-date="0"
          onClick={onDispatchDate}
          className="rounded-2xl bg-stone-300/50 py-4 text-center font-bold shadow-sm backdrop-blur-sm"
        >
          Hôm nay
        </button>
        <button
          onClick={onRemove}
          className="mt-4 rounded-2xl bg-stone-300/50 py-4 text-center font-bold shadow-sm backdrop-blur-sm"
        >
          Hủy
        </button>
      </div>
    </div>
  );
}
export default DateSelect;
