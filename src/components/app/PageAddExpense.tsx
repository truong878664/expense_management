"use client";

import {
  InitStateExpense,
  extend,
  reset,
} from "@/app/@modal/(.)add-expense/createExpenseSlice";
import { ExpensePayload, add } from "@/app/expenseSlice";
import Money from "@/function/formatMoney";
import { findExpenseGroup } from "@/function/groupExpenseList";
import uid from "@/function/uid";
import {
  faAlignLeft,
  faAngleRight,
  faAngleUp,
  faCaretDown,
  faStroopwafel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateSelect from "../expense/DateSelect";
import useDebounce from "@/hooks/useDebounce";
import classNames from "classnames";
import shortHandString from "@/function/shortHandString";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

function PageAddExpense({ handleDismiss }: { handleDismiss: () => void }) {
  const dispatch = useDispatch();
  const expense = useSelector(
    (state: { createExpense: InitStateExpense }) => state.createExpense,
  );
  const [money, setMoney] = useState<string | number>(
    Money.formatNumber(expense.money),
  );
  const [moneyDebounce, setMoneyDebounce] = useDebounce<string>();
  const [dateSelect, setDateSelect] = useState<ReactElement | null>(null);
  const onchange = (e: any) => {
    const valueInput = Money.formatNumber(e.target.value);
    setMoney(valueInput);
    setMoneyDebounce(valueInput);
  };

  const handleResetExpense = () => {
    setMoney(0);
    dispatch(reset());
  };
  const onSubmit = () => {
    const payloadExpense: ExpensePayload = {
      ...expense,
    };
    dispatch(add(payloadExpense));
    handleResetExpense();
    handleDismiss();
  };

  const dispatchMoney = () => {
    const moneyExpense = Number(money.toString().replaceAll(",", ""));
    expense.money !== moneyExpense &&
      (() => {
        dispatch(extend({ money: moneyExpense }));
        console.log("Dispatch money: ", moneyExpense);
      })();
  };
  const groupSelector = findExpenseGroup(expense.group);
  const onSelectDate = () => {
    setDateSelect(<DateSelect handleRemove={setDateSelect} />);
  };
  useEffect(() => {
    dispatch(extend({ id: uid("ex") }));
  }, []);
  useEffect(dispatchMoney, [moneyDebounce]);

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
            <span className="inline-block rounded-md border border-gray-300 px-2 font-bold uppercase text-gray-500">
              vnd
            </span>
          </div>
          <div className="flex flex-1 flex-col border-b">
            <span className="text-xs">Số tiền</span>

            <input
              type="text"
              value={money}
              className={classNames(
                "w-full bg-transparent text-2xl outline-none",
                { "text-gray-500": money === "0" },
              )}
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
            <span
              className={classNames("text-2xl", {
                "text-gray-500": !groupSelector?.title,
              })}
            >
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
            <span
              className={classNames({
                "text-gray-500": !expense.describe,
              })}
            >
              {expense.describe && expense.describe?.length > 20
                ? shortHandString(expense.describe)
                : expense.describe || "Ghi chú"}
            </span>
            <FontAwesomeIcon className="text-gray-400" icon={faAngleRight} />
          </Link>
        </div>
        <div className="flex gap-4">
          <div className="grid aspect-square w-10 place-content-center text-gray-500">
            <FontAwesomeIcon className="text-gray-400" icon={faCalendar} />
          </div>
          <button
            className="flex flex-1 items-center justify-between border-b pr-2"
            onClick={onSelectDate}
          >
            <span className="">
              {expense.day}, {expense.date}/{expense.month}/{expense.year}
            </span>
            <FontAwesomeIcon className="text-gray-400" icon={faAngleUp} />
          </button>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2 bg-gray-200/70 p-2">
        <button>
          <FontAwesomeIcon icon={faCaretDown} className="mr-4 text-gray-500" />
          <span className="text-green-500">Thêm chi tiết</span>
        </button>
      </div>
      {dateSelect}
    </>
  );
}

export default PageAddExpense;
