"use client";
import { Expense, ExpenseDay, ExpenseList } from "@/app/expenseSlice";
import CDate from "@/function/CDate";
import useQueryParams from "@/hooks/useQueryParams";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import sum from "@/function/sum";
import toExpenseListDay from "@/function/toExpenseListDay";
import Statistic from "./Statistics";
import ListExpenseDay from "./ListExpenseDay";
import useExpenseSelector from "@/app/useExpenseSelector";

function DetailExpense() {
  const DateObject = new CDate();
  const dateNow = DateObject.today;
  const params = useQueryParams();
  const activeDate = params.get("date") || dateNow;
  const [expenseSelect, setExpenseSelect] = useState<ExpenseDay[]>();
  const [pastTotal, setPastTotal] = useState(0);
  const [totalSelect, setTotalSelect] = useState(0);

  const expenseStore = useExpenseSelector();
  const expense = expenseStore.get();
  const [dateString, monthString, yearString] = activeDate.split("/");

  const { date, day, month, year } = new CDate().setTime({
    date: dateString,
    month: monthString,
    year: yearString,
  });

  useLayoutEffect(() => {
    if (activeDate === "future") {
      const listExpenseFuture = toExpenseListDay(expense, {
        type: "future",
        date: DateObject.date,
        month: DateObject.month,
        year: DateObject.year,
      });

      !!listExpenseFuture.length
        ? setExpenseSelect(listExpenseFuture)
        : setExpenseSelect(undefined);
    } else {
      const { data } = expense;
      const expenseDayList: ExpenseDay = data?.[year]?.[month]?.[date];
      expenseDayList
        ? setExpenseSelect([expenseDayList])
        : setExpenseSelect(undefined);
    }

    (function handleSetPastTotalMoney() {
      const listExpensePast = toExpenseListDay(expense, {
        type: "past",
        date: activeDate === "future" ? date + 1 : date,
        month,
        year,
      });

      const pastSum = sum(listExpensePast, expense.initBalance);
      setPastTotal(pastSum);
    })();

    console.log("Render expense list day: ", activeDate);
  }, [expense, activeDate]);

  useEffect(() => {
    const total = expenseSelect?.reduce((total, expenseDayList) => {
      return expenseDayList.total + total;
    }, 0);
    setTotalSelect(total || 0);
  }, [expenseSelect]);
  return (
    <>
      <Statistic pastTotal={pastTotal} totalSelect={totalSelect} />
      <div className="my-2 mb-10 mt-6 flex flex-1 flex-col gap-2">
        {expenseSelect ? (
          expenseSelect.map((expenseDayList, index) => {
            return (
              <ListExpenseDay
                key={index}
                date={expenseDayList.date}
                month={expenseDayList.month}
                year={expenseDayList.year}
                day={expenseDayList.day}
                totalDay={expenseDayList.total}
                expenseDay={expenseDayList.expenseList}
              />
            );
          })
        ) : (
          <ListExpenseDay
            date={dateString}
            month={month}
            year={year}
            day={day}
          />
        )}
      </div>
    </>
  );
}

export default memo(DetailExpense);
