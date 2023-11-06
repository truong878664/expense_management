"use client";
import { Expense, ExpenseDay, ExpenseList } from "@/app/expenseSlice";
import ItemExpense from "@/components/expense/ItemExpense";
import CDate from "@/function/CDate";
import Money from "@/function/formatMoney";
import { findExpenseGroup } from "@/function/groupExpenseList";
import useQueryParams from "@/hooks/useQueryParams";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { memo, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import box from "@/assets/empty-box.png";
import Image from "next/image";
import shortHandString from "@/function/shortHandString";
import copy from "@/function/copy";
import sum from "@/function/sum";
import { to } from "@/function/toExpenseListDay";

function DetailExpense() {
  const DateObject = new CDate();
  const dateNow = DateObject.today;
  const params = useQueryParams();
  const activeDate = params.get("date") || dateNow;
  const [expenseDayList, setExpenseDayList] = useState<ExpenseDay>();
  const [bgEmptyBox, setBgEmptyBox] = useState("");
  const [previousTotal, setPreviousTotal] = useState(0);

  const expense = useSelector(
    (state: { createSlice: Expense }) => state.createSlice,
  );
  const [dateString, monthString, yearString] = activeDate.split("/");
  const date = +dateString;
  const month = +monthString;
  const year = +yearString;

  const totalDay = expenseDayList?.total || 0;

  useLayoutEffect(() => {
    const { data } = expense;
    const expenseDayList: ExpenseDay = data?.[year]?.[month]?.[date];
    setExpenseDayList(expenseDayList);
    setBgEmptyBox(
      "#" + Math.floor(Math.random() * 16777215).toString(16) + "22",
    );
    console.log("Render expense list day: ", activeDate);

    // if (!expense.data) return;
    // const listExpense: ExpenseDay[] = [];
    // Object.keys(expense?.data)?.map((yearM: any) => {
    //   if (Number(yearM) > Number(year)) return;
    //   const yearList = expense.data[yearM];
    //   if (!yearList) return;
    //   Object.keys(yearList).map((monthM: any) => {
    //     if (Number(monthM) > Number(month) && Number(yearM) === Number(year))
    //       return;
    //     const monthList = yearList[monthM];
    //     if (!monthList) return;
    //     Object.keys(monthList).map((dateM: any) => {
    //       if (
    //         Number(dateM) >= Number(date) &&
    //         Number(monthM) === Number(month) &&
    //         Number(yearM) === Number(year)
    //       )
    //         return;

    //       if (!monthList[dateM]) return;
    //       listExpense.push(copy(monthList[dateM]));
    //       return listExpense;
    //     });
    //   });
    // });
    if (activeDate === "future") {
      const listExpense = to(expense, {
        type: "future",
        date: DateObject.date,
        month: DateObject.month,
        year: DateObject.year,
      });
      console.log(listExpense);

      return;
    }
    const listExpense = to(expense, { type: "past", date, month, year });
    if (!listExpense) return;
    const previousSum = sum(listExpense, expense.initBalance);
    setPreviousTotal(previousSum);
  }, [expense, activeDate]);

  const dataDispatchTime = new CDate().setTime({ date, month, year });

  return (
    <>
      <div className="bg-gray-100 p-2">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-1">
            <span>Số dư đầu</span>
            <span>Số dư cuối</span>
          </div>
          <div className="flex flex-col items-end gap-1 font-bold">
            <span
              className={classNames({
                "text-red-600": previousTotal < 0,
              })}
            >
              {Money.format(previousTotal)}
            </span>
            <span
              className={classNames("border-b", {
                "text-red-600": previousTotal + totalDay < 0,
              })}
            >
              {Money.format(previousTotal + totalDay)}
            </span>
            <span
              className={classNames({
                "text-red-600": totalDay < 0,
              })}
            >
              {Money.format(totalDay)}
            </span>
          </div>
        </div>
        <div className="text-center text-green-600">
          <button>Xem báo cáo cho giai đoạn này</button>
        </div>
      </div>

      <div className="my-2 mt-6 flex flex-1 flex-col">
        <div className="sticky top-0 z-1 flex items-center justify-between bg-gray-100 p-2 shadow shadow-gray-100">
          <div className="flex">
            <span className="mr-2 text-4xl font-bold text-sky-700">{date}</span>
            <div className="flex flex-col justify-center text-sm leading-tight">
              <span>{dataDispatchTime.day}</span>
              <span>
                tháng {month} năm {year}
              </span>
            </div>
          </div>
          <span
            className={classNames("text-lg font-bold", {
              "text-red-600": totalDay < 0,
              "text-green-600": totalDay > 0,
              "sr-only": totalDay === 0,
            })}
          >
            {Money.format(totalDay)}
          </span>
        </div>

        {expenseDayList ? (
          <ul className="mb-10 flex flex-col gap-5 bg-gray-100 px-2 py-4">
            {expenseDayList.expenseList.map((item, index: number) => {
              const group = findExpenseGroup(item.group);
              return (
                <ItemExpense
                  key={index}
                  type={group?.type || "expense"}
                  kind={group?.title || "Không có tiêu đề"}
                  describe={shortHandString(item.describe)}
                  value={item.money}
                  icon={group?.iconFa?.icon || faPaw}
                  color={(group?.color as `#${string}`) || "#F875AA"}
                />
              );
            })}
          </ul>
        ) : (
          <div className="grid flex-1 place-content-center bg-cyan-50/20">
            <div className="relative h-72 w-72 p-16">
              <div
                className="absolute left-0 top-0 -z-1 h-full w-full rounded-full blur-3xl"
                style={{
                  backgroundColor: bgEmptyBox,
                }}
              ></div>
              <Image
                src={box.src}
                width={box.width}
                height={box.height}
                alt="Empty box error"
                className="grid h-full place-content-center object-contain text-center font-bold text-red-500"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(DetailExpense);
