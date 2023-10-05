"use client";

import {
  InitStateExpense,
  extend,
  reset,
} from "@/app/@modal/(.)add-expense/createExpenseSlice";
import Money from "@/function/formatMoney";
import { findExpenseGroup } from "@/function/groupExpenseList";
import uid from "@/function/uid";
import {
  faAlignLeft,
  faAngleRight,
  faCalendarDay,
  faCaretDown,
  faStroopwafel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function PageAddExpense({ handleDismiss }: { handleDismiss: () => void }) {
  const dispatch = useDispatch();
  const expense = useSelector(
    (state: { createExpense: InitStateExpense }) => state.createExpense,
  );
  const [value, setValue] = useState<string | number>(
    Money.formatNumber(expense.money),
  );
  const onchange = (e: any) => {
    const valueInput = Money.formatNumber(e.target.value);
    setValue(valueInput);
  };
  const onSubmit = () => {
    console.log(expense);
    setValue(0);
    dispatch(reset());
    handleDismiss();
  };

  const dispatchMoney = () => {
    const moneyExpense = Number(value.toString().replaceAll(",", ""));
    dispatch(extend({ money: moneyExpense }));
  };
  const groupSelector = findExpenseGroup(expense.group);
  useEffect(() => {
    dispatch(extend({ id: uid("ex") }));
  }, []);
  return (
    <>
      <div className="sticky top-0 mb-2 flex justify-between border-b px-4 py-2 font-bold capitalize">
        <button onClick={handleDismiss}>Hủy</button>
        <span>Thêm giao dịch</span>
        <button className="disabled:opacity-50" onClick={onSubmit}>
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
          <div
            className="grid aspect-square w-10 place-content-center rounded-full bg-rose-300/20 text-2xl text-rose-400"
            style={{
              backgroundColor: groupSelector?.color + "3F",
              color: groupSelector?.color,
            }}
          >
            <FontAwesomeIcon
              icon={groupSelector?.iconFa?.icon || faStroopwafel}
            />
          </div>
          <Link
            onClick={dispatchMoney}
            href={"/add-expense/group"}
            className="flex flex-1 items-center justify-between border-b pr-2"
          >
            <span className="text-2xl text-gray-600">
              {groupSelector?.title || "Chọn nhóm"}
            </span>
            <FontAwesomeIcon className="text-gray-400" icon={faAngleRight} />
          </Link>
        </div>
        <div className="flex gap-4">
          <div className="grid aspect-square w-10 place-content-center text-gray-500">
            <FontAwesomeIcon className="text-gray-400" icon={faAlignLeft} />
          </div>
          <Link
            onClick={dispatchMoney}
            href={"/add-expense/note"}
            className="flex flex-1 items-center justify-between border-b pr-2"
          >
            <span className="">
              {expense.describe && expense.describe?.length > 20
                ? expense.describe?.slice(0, 20) + "..."
                : expense.describe || "Ghi chú"}
            </span>
            <FontAwesomeIcon className="text-gray-400" icon={faAngleRight} />
          </Link>
        </div>
        <div className="flex gap-4">
          <div className="grid aspect-square w-10 place-content-center text-gray-500">
            <FontAwesomeIcon className="text-gray-400" icon={faCalendarDay} />
          </div>
          <button className="flex flex-1 items-center justify-between border-b pr-2">
            <span className="">{expense.date}</span>
            <FontAwesomeIcon className="text-gray-400" icon={faAngleRight} />
          </button>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2 bg-gray-200/70 p-2">
        <button>
          <FontAwesomeIcon icon={faCaretDown} className="mr-4 text-gray-500" />
          <span className="text-green-500">Thêm chi tiết</span>
        </button>
      </div>
    </>
  );
}

export default PageAddExpense;
