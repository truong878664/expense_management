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
import downloadXlsx from "@/function/dowload";

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
        <div className="absolute right-4 top-2 flex gap-6">
          <button className="rounded-md px-3 py-1 hover:bg-gray-500/10">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <div className="group/more-action relative">
            <button className="rounded-md px-3 py-1 hover:bg-gray-500/10">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>

            <ul className="absolute right-0 top-full hidden whitespace-nowrap rounded bg-gray-50 py-2 text-sm shadow group-hover/more-action:block">
              <li>
                <button
                  onClick={() => {
                    downloadXlsx("expense.xlsx", expense);
                  }}
                  className="cursor-pointer px-2 py-1"
                >
                  Export file excel
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col text-center">
            <span className="text-sm font-bold">Số dư</span>
            <span className="font-bold">{money}</span>
          </div>
        </div>
        <div className="mt-2 grid place-content-center">
          <button className="flex items-center justify-center rounded-lg bg-gray-200 px-2 py-1">
            <FontAwesomeIcon
              icon={faWallet}
              className="rounded-full bg-slate-500/50 p-1 text-orange-400/90"
            />
            <span className="px-2 text-sm font-bold">Tiền mặt</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </div>
        <div className="w-full border-b">
          <ul
            ref={dateWrapperRef}
            className="flex w-full select-none gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap border-inherit px-6 py-2 scrollbar-none"
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
