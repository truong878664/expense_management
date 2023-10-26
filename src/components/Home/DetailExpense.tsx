"use client";
import { ExpenseDay } from "@/app/expenseSlice";
import ItemExpense from "@/components/expense/ItemExpense";
import Money from "@/function/formatMoney";
import { findExpenseGroup } from "@/function/groupExpenseList";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
function DetailExpense({ activeDate }: { activeDate: string }) {
  const [expenseDayList, setExpenseDayList] = useState<ExpenseDay>();

  const expense = useSelector(
    (state: { createSlice: any }) => state.createSlice,
  );
  const [day, month, year] = activeDate.split("/");
  useEffect(() => {
    const { data } = expense;
    const expenseDayList: ExpenseDay = data?.[year]?.[month]?.[day];
    setExpenseDayList(expenseDayList);
    console.log("change");
  }, [expense, activeDate]);
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
        <div className="flex items-center justify-between">
          <div className="flex">
            <span className="mr-2 text-4xl font-bold">{day}</span>
            <div className="flex flex-col justify-center text-sm leading-tight">
              <span>Hôm nay</span>
              <span>
                tháng {month} năm {year}
              </span>
            </div>
          </div>
          <span className="text-lg font-bold">
            {Money.format(expenseDayList?.total as number)}
          </span>
        </div>

        <div className="mt-3">
          {expenseDayList?.expenseList.map((item, index: number) => {
            const group = findExpenseGroup(item.group);
            console.log(item);
            if (!item.group || !item.money) return;
            return (
              <ItemExpense
                key={index}
                type={index % 2 ? "expense" : "income"}
                kind={group?.title || ""}
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
