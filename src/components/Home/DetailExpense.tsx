"use client";
import { ExpenseDay } from "@/app/expenseSlice";
import ItemExpense from "@/components/expense/ItemExpense";
import CDate from "@/function/CDate";
import Money from "@/function/formatMoney";
import { findExpenseGroup } from "@/function/groupExpenseList";
import useQueryParams from "@/hooks/useQueryParams";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
function DetailExpense() {
  const dateNow = new Date().toLocaleDateString();
  const params = useQueryParams();
  const activeDate = params.get("date") || dateNow;
  const [expenseDayList, setExpenseDayList] = useState<ExpenseDay>();
  const expense = useSelector(
    (state: { createSlice: any }) => state.createSlice,
  );
  const [date, month, year] = activeDate.split("/");
  useEffect(() => {
    const { data } = expense;
    const expenseDayList: ExpenseDay = data?.[year]?.[month]?.[date];
    setExpenseDayList(expenseDayList);
    console.log("Render expense list day: ", activeDate);
  }, [expense, activeDate]);

  const total = expenseDayList?.total;
  const classNameTotalMoney = classNames("text-lg font-bold", {
    "text-red-600": +expenseDayList?.total < 0,
    "text-green-600": +expenseDayList?.total > 0,
  });
  const dataDispatchTime = new CDate().setTime({ date, month, year });
  return (
    <>
      <div className="bg-gray-100 p-2">
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <span className="mb-1">Số dư đầu</span>
            <span className="mb-1">Số dư cuối</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="mb-1">+7,800,000 đ</span>
            <span className="mb-1 border-b">+7,800,000 đ</span>
            <span className="mb-1">-29,000 đ</span>
          </div>
        </div>
        <div className="text-center text-green-600">
          <button>Xem báo cáo cho giai đoạn này</button>
        </div>
      </div>

      <div className="mt-6 bg-gray-100 p-2">
        <div className="sticky top-0 z-1 flex items-center justify-between bg-gray-100 shadow shadow-gray-100">
          <div className="flex">
            <span className="mr-2 text-4xl font-bold text-sky-700">{date}</span>
            <div className="flex flex-col justify-center text-sm leading-tight">
              <span>{dataDispatchTime.day}</span>
              <span>
                tháng {month} năm {year}
              </span>
            </div>
          </div>
          <span className={classNameTotalMoney}>
            {Money.format(expenseDayList?.total as number)}
          </span>
        </div>

        <div className="mt-3">
          {expenseDayList?.expenseList.map((item, index: number) => {
            const group = findExpenseGroup(item.group);
            return (
              <ItemExpense
                key={index}
                type={index % 2 ? "expense" : "income"}
                kind={group?.title || "Không có tiêu đề"}
                describe={item.describe || ""}
                value={Money.format(item.money)}
                icon={group?.iconFa?.icon || faPaw}
                color={(group?.color as `#${string}`) || "#F875AA"}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default memo(DetailExpense);
