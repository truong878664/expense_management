"use client";

import Money from "@/function/formatMoney";
import {
  faAlignLeft,
  faAngleRight,
  faCalendarDay,
  faCaretDown,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { RefObject, useEffect, useRef } from "react";

function PageAddExpense() {
  const addExpenseWrapperRef: RefObject<HTMLDivElement> = useRef(null);
  const route = useRouter();
  const onDismiss = () => {
    if (addExpenseWrapperRef.current) {
      addExpenseWrapperRef.current!.dataset.active = "";
    }
    setTimeout(() => {
      route.back();
    }, 400);
  };

  useEffect(() => {
    addExpenseWrapperRef.current!.dataset.active = "show";
  }, []);
  const [value, setValue] = useState<string | number>(0);
  const onchange = (e: any) => {
    const value = Money.formatNumber(e.target.value);
    setValue(value);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0">
      <div
        onClick={onDismiss}
        className="absolute bottom-0 left-0 right-0 top-0 bg-black/10 backdrop-blur-[1px]"
      ></div>
      <div
        data-active=""
        id="add-expense-wrapper"
        ref={addExpenseWrapperRef}
        className="absolute bottom-0 left-0 top-14 w-full translate-y-full rounded-t-3xl border-t bg-slate-100 py-2 transition-all duration-500 data-[active='show']:translate-y-0 "
      >
        <div className="mb-2 flex justify-between border-b px-4 py-2 font-bold capitalize">
          <button onClick={onDismiss}>Hủy</button>
          <span>Thêm giao dịch</span>
          <button disabled className="disabled:opacity-50">
            Lưu
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-2 bg-gray-200/70 p-2">
          <div className="flex gap-4">
            <div className="grid aspect-square w-10 place-content-center">
              <span className="inline-block rounded-md border border-gray-300 px-2 font-bold uppercase text-gray-400">
                vnd
              </span>
            </div>
            <div className="flex flex-1 flex-col border-b">
              <span className="text-xs">Số tiền</span>
              <input
                type="text"
                value={value}
                className="w-full bg-transparent text-2xl outline-none"
                onChange={onchange}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="grid aspect-square w-10 place-content-center rounded-full bg-rose-300/20 text-rose-400">
              <FontAwesomeIcon icon={faMugHot} />
            </div>
            <Link
              href={"/add-expense/group"}
              className="flex flex-1 items-center justify-between pr-2"
            >
              <span className="text-lg">Chọn nhóm</span>
              <FontAwesomeIcon className="text-gray-400" icon={faAngleRight} />
            </Link>
          </div>
          <div className="flex gap-4">
            <div className="grid aspect-square w-10 place-content-center text-gray-500">
              <FontAwesomeIcon className="text-gray-400" icon={faAlignLeft} />
            </div>
            <button className="flex flex-1 items-center justify-between pr-2">
              <span className="text-lg">Ghi chú</span>
              <FontAwesomeIcon className="text-gray-400" icon={faAngleRight} />
            </button>
          </div>
          <div className="flex gap-4">
            <div className="grid aspect-square w-10 place-content-center text-gray-500">
              <FontAwesomeIcon className="text-gray-400" icon={faCalendarDay} />
            </div>
            <button className="flex flex-1 items-center justify-between pr-2">
              <span className="text-lg">Ngày</span>
              <FontAwesomeIcon className="text-gray-400" icon={faAngleRight} />
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 bg-gray-200/70 p-2">
          <button>
            <FontAwesomeIcon
              icon={faCaretDown}
              className="mr-4 text-gray-500"
            />
            <span className="text-green-500">Thêm chi tiết</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageAddExpense;
