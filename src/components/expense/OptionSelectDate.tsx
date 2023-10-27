"use client";
import CDate from "@/function/CDate";
import findElementByPositionAndDataName from "@/function/findElementByPositionAndDataName";
import useDebounce from "@/hooks/useDebounce";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { RefObject, useEffect, useRef } from "react";
function OptionSelectDate({ handleRemove }: { handleRemove: () => void }) {
  const getNode = document.querySelector.bind(document);
  const dayElementRef: RefObject<HTMLUListElement> = useRef(null);
  const dayWrapperRef: RefObject<HTMLDivElement> = useRef(null);
  const [debounce, setDebounce] = useDebounce<unknown>(0, 250);
  const { date, month, year } = new CDate().full;
  const dayValueRef = useRef();

  useEffect(() => {
    dayElementRef.current?.addEventListener("scroll", (e: any) => {
      setDebounce((debounce: number) => debounce + 1);
    });
  }, []);

  useEffect(() => {
    const dayRect = dayWrapperRef.current?.getBoundingClientRect();
    if (!dayRect) return;
    const { x = 0, y = 0, width = 0, height = 0 } = dayRect;
    const xRect = x + width / 2;
    const yRect = y + height / 2;
    const element = findElementByPositionAndDataName(
      xRect,
      yRect,
      "date-select",
    );
    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [debounce]);

  useEffect(() => {
    ["date", "month", "year"]
      .map((key) =>
        getNode(`[data-name="${key}-select"][data-value='${eval(key)}']`),
      )
      .forEach((li) => {
        li?.scrollIntoView({
          behavior: "auto",
          block: "center",
        });
      });
  }, []);
  const classNameUlDate = classNames(
    " absolute left-0 top-1/2 h-96 w-full -translate-y-1/2 select-none overflow-auto text-center scrollbar-none first:pt-[11.4rem] last:pb-[11.4rem] [&_li]:py-2",
  );
  return (
    <div className="bg-/10 fixed bottom-0 left-0 right-0 top-0 z-10 grid place-content-center overflow-hidden p-4 backdrop-blur-sm">
      <div className="flex gap-6 pb-10 text-xl">
        <div
          ref={dayWrapperRef}
          className="relative h-9 w-14 border border-black/10 px-4 py-2 backdrop-blur-sm"
        >
          <ul ref={dayElementRef} className={classNameUlDate}>
            {Array.from({ length: 31 }).map((item, index) => {
              const day = index + 1;
              return (
                <li key={index} data-value={day} data-name="date-select">
                  {day}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative h-9 w-14 border border-black/10 px-4 py-2 backdrop-blur-sm">
          <ul className={classNameUlDate}>
            {Array.from({ length: 12 }).map((item, index) => {
              const month = index + 1;
              return (
                <li key={index} data-value={month} data-name="month-select">
                  {month}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative h-9 w-14 border border-black/10 px-4 py-2 backdrop-blur-sm">
          <ul className={classNameUlDate}>
            {Array.from({ length: 30 }).map((item, index) => {
              const year = 1999 + index;
              return (
                <li key={index} data-value={year} data-name="year-select">
                  {year}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="absolute right-0 top-0 aspect-square px-4 py-2 text-slate-700"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}

export default OptionSelectDate;
