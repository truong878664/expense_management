"use client";
import { extend } from "@/app/@modal/(.)add-expense/createExpenseSlice";
import CDate from "@/function/CDate";
import findElementByPositionAndDataName from "@/function/findElementByPositionAndDataName";
import useDebounce from "@/hooks/useDebounce";
import { faCaretDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { faChevronCircleDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import gsap from "gsap";
import {
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../app/Button";

type LiNode = ChildNode | null | undefined;
type EffectChangeDate = {
  wrapper: HTMLElement | null;
  queryLi: string;
};
type ValueDateRef = {
  date: number;
  month: number;
  year: number;
};

function OptionSelectDate({
  handleRemove,
}: {
  handleRemove: (type: "all" | "option") => void;
}) {
  const getNode = document.querySelector.bind(document);
  const dispatch = useDispatch();
  const date = new CDate();

  const optionSelectDateWrapperRef: RefObject<HTMLDivElement> = useRef(null);
  const dayWrapperRef: RefObject<HTMLDivElement> = useRef(null);
  const dayElementRef: RefObject<HTMLUListElement> = useRef(null);
  const monthElementRef: RefObject<HTMLUListElement> = useRef(null);
  const yearElementRef: RefObject<HTMLUListElement> = useRef(null);
  const valueDateRef: RefObject<ValueDateRef> = useRef({
    date: date.date,
    month: date.month,
    year: date.year,
  });
  const [loading, setLoading] = useState(false);

  const expense = useSelector(
    (state: { createExpense: any }) => state.createExpense,
  );

  const classNameUlDate = classNames(
    "absolute left-0 top-1/2 h-96 w-full -translate-y-1/2 cursor-n-resize select-none snap-y snap-mandatory overflow-auto text-center scrollbar-none first:pt-[11.4rem] last:pb-[11.4rem] [&_li]:py-2",
  );

  const classListEffect = [
    ["transition-all", "duration-200", "scale-90", "opacity-80"],
    ["transition-all", "duration-200", "scale-75", "opacity-50"],
    ["transition-all", "duration-200", "scale-50", "opacity-20"],
    ["transition-all", "duration-200", "scale-50", "opacity-0"],
    ["transition-all", "duration-200", "scale-0", "opacity-0"],
  ];
  const [debounceChangeDate, setDebounceChangeDate] = useDebounce<unknown>(
    0,
    600,
  );

  const resetEffectLi = (wrapper: HTMLElement) => {
    wrapper?.childNodes.forEach((li) => {
      (li as HTMLElement)?.classList.forEach((classItem) => {
        (li as HTMLElement)?.classList.remove("transition-all", "duration-200");
        const isHadClassScaleOrOpacity =
          classItem.indexOf("scale") != -1 ||
          classItem.indexOf("opacity") != -1;
        if (isHadClassScaleOrOpacity) {
          (li as HTMLElement).classList.remove(classItem);
        }
      });
    });
  };

  const onScrollSelectDate = (e: any) => {
    setLoading(false);
    resetEffectLi(e.target);
    setDebounceChangeDate(
      (debounceChangeDate: number) => debounceChangeDate + 1,
    );
  };

  const onRemove = (type: "all" | "option" = "option") => {
    gsap.to(optionSelectDateWrapperRef.current, {
      translateY: "100%",
      duration: 0.3,
      opacity: 1,
      onComplete: () => {
        handleRemove(type);
      },
    });
  };

  const onSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    const dataDispatchTime = new CDate().setTime({
      date: valueDateRef.current?.date || date.date,
      month: valueDateRef.current?.month || date.month,
      year: valueDateRef.current?.year || date.year,
    });
    dispatch(
      extend({
        date: dataDispatchTime.date,
        month: dataDispatchTime.month,
        year: dataDispatchTime.year,
        day: dataDispatchTime.day,
      }),
    );
    onRemove("all");
  };

  useEffect(() => {
    dayElementRef.current?.addEventListener("scroll", onScrollSelectDate);
    monthElementRef.current?.addEventListener("scroll", onScrollSelectDate);
    yearElementRef.current?.addEventListener("scroll", onScrollSelectDate);
    return () => {
      dayElementRef.current?.removeEventListener("scroll", onScrollSelectDate);
      monthElementRef.current?.removeEventListener(
        "scroll",
        onScrollSelectDate,
      );
      yearElementRef.current?.removeEventListener("scroll", onScrollSelectDate);
    };
  }, []);

  const effectSelectDate = ({ wrapper, queryLi }: EffectChangeDate) => {
    const wrapperRect = wrapper?.getBoundingClientRect();
    if (!wrapperRect) return;
    const { x = 0, y = 0, width = 0, height = 0 } = wrapperRect;
    const xRect = x + width / 2;
    const yRect = y + height / 2;
    const liNode = findElementByPositionAndDataName(xRect, yRect, queryLi);
    const labelTime = liNode?.dataset.label;
    const date = Number(liNode?.dataset.value);
    if (labelTime && valueDateRef.current) {
      valueDateRef.current[labelTime as keyof ValueDateRef] = date || 0;
    }
    setLoading(true);
    const listLiNext: LiNode[] = [];
    const listLiPrevious: LiNode[] = [];
    let currentLiNext = liNode as LiNode;
    let currentLiPrevious = liNode as LiNode;
    for (let i = 0; i < 5; i++) {
      listLiNext.push(currentLiNext?.nextSibling);
      listLiPrevious.push(currentLiPrevious?.previousSibling);
      currentLiNext = currentLiNext?.nextSibling;
      currentLiPrevious = currentLiPrevious?.previousSibling;
    }
    listLiPrevious.forEach((li, index) => {
      (li as HTMLElement)?.classList.add(...classListEffect[index]);
      (listLiNext[index] as HTMLElement)?.classList.add(
        ...classListEffect[index],
      );
    });
  };

  useEffect(() => {
    const scrollInitSelectDate = () => {
      ["date", "month", "year"]
        .map((key) =>
          getNode(
            `[data-name="${key}-select"][data-value='${
              expense[key as keyof typeof expense]
            }']`,
          ),
        )
        .forEach((li) => {
          li?.scrollIntoView({
            behavior: "auto",
            block: "center",
          });
        });
      gsap.fromTo(dayWrapperRef.current, { opacity: 0 }, { opacity: 1 });
    };
    gsap.fromTo(
      optionSelectDateWrapperRef.current,
      { translateY: "100%", opacity: 0 },
      {
        translateY: "0",
        duration: 0.3,
        opacity: 1,
        onComplete: scrollInitSelectDate,
      },
    );
  }, []);

  useEffect(() => {
    effectSelectDate({
      wrapper: dayElementRef.current,
      queryLi: "date-select",
    });
    effectSelectDate({
      wrapper: monthElementRef.current,
      queryLi: "month-select",
    });
    effectSelectDate({
      wrapper: yearElementRef.current,
      queryLi: "year-select",
    });
  }, [debounceChangeDate]);

  return (
    <div
      ref={optionSelectDateWrapperRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-20 flex flex-col items-center overflow-hidden px-2 py-4 backdrop-blur-md"
    >
      <div
        ref={dayWrapperRef}
        className="grid flex-1 place-content-center opacity-0"
      >
        <div className="flex gap-6 text-2xl font-bold text-gray-600">
          <div className="relative h-9 w-16 border border-black/10 px-4 py-2 backdrop-blur-sm">
            <ul ref={dayElementRef} className={classNameUlDate}>
              {Array.from({ length: 31 }).map((item, index) => {
                const day = index + 1;
                return (
                  <li
                    key={index}
                    data-value={day}
                    data-label="date"
                    data-name="date-select"
                    className="snap-center"
                  >
                    {day}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative h-9 w-16 border border-black/10 px-4 py-2 backdrop-blur-sm">
            <ul className={classNameUlDate} ref={monthElementRef}>
              {Array.from({ length: 12 }).map((item, index) => {
                const month = index + 1;
                return (
                  <li
                    key={index}
                    data-value={month}
                    data-label="month"
                    data-name="month-select"
                    className="snap-center "
                  >
                    {month}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative h-9 w-16 border border-black/10 px-4 py-2 backdrop-blur-sm">
            <ul className={classNameUlDate} ref={yearElementRef}>
              {Array.from({ length: 30 }).map((item, index) => {
                const year = 2005 + index;
                return (
                  <li
                    key={index}
                    data-value={year}
                    data-label="year"
                    data-name="year-select"
                    className="snap-center"
                  >
                    {year}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Button
          onClick={onSubmit}
          className={classNames(
            "[&.disable]:pointer-events-none [&.disable]:text-gray-400",
            { disable: !loading },
          )}
        >
          Chọn
        </Button>
        <Button onClick={() => onRemove()}>Hủy</Button>
      </div>
    </div>
  );
}

export default OptionSelectDate;
