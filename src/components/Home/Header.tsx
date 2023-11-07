"use client";
import {
  faCaretDown,
  faEllipsisVertical,
  faMagnifyingGlass,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LiDate from "../header/LiDate";
import {
  RefObject,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import dateList from "@/function/dateList";
import { useSelector } from "react-redux";
import { Expense } from "@/app/expenseSlice";
import Money from "@/function/formatMoney";
import MoreAction from "./MoreAction";
import SelectWallet from "./SelectWallet";

function Header({ activeDate }: { activeDate: string }) {
  const dateWrapperRef: RefObject<HTMLUListElement> = useRef(null);
  const [money, setMoney] = useState<string | 0>("0 ₫");
  const expense = useSelector(
    (state: { createSlice: Expense }) => state.createSlice,
  );
  const firstRenderHeaderRef = useRef(true);
  useLayoutEffect(() => {
    let behavior: "smooth" | "auto" = "smooth";
    if (firstRenderHeaderRef.current) {
      behavior = "auto";
      firstRenderHeaderRef.current = false;
    }
    dateWrapperRef.current?.querySelector(".active")?.scrollIntoView({
      behavior,
      block: "center",
      inline: "center",
    });
  }, [activeDate]);

  useLayoutEffect(() => {
    setMoney(Money.format(expense.finalBalance as number));
  }, [expense.finalBalance]);

  return (
    <header>
      <div className="relative pt-2">
        <div className="absolute right-1 top-2 flex gap-4">
          <button className="min-w-[40px] rounded-md px-3 py-1">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <MoreAction expense={expense} />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col text-center">
            <span className="text-sm font-bold">Số dư</span>
            <span className="font-bold">{money}</span>
          </div>
        </div>
        <div className="mt-2 grid place-content-center">
          <SelectWallet />
        </div>
        <div className="w-full border-b">
          <ul
            ref={dateWrapperRef}
            className="mt-2 flex w-full select-none gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap border-inherit px-6 py-1 text-sm scrollbar-none"
          >
            {dateList.map((date, index) => {
              return (
                <LiDate
                  key={index}
                  active={activeDate === date.value}
                  value={date.value}
                  title={date.title}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
