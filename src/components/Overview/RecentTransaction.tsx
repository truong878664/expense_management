"use client";

import Link from "next/link";
import ItemExpense from "../expense/ItemExpense";
import { faPaw, faRibbon } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ExpenseList } from "@/app/expenseSlice";
import CDate from "@/function/CDate";
import { findExpenseGroup } from "@/function/groupExpenseList";
import useQueryParams from "@/hooks/useQueryParams";
import { UseExpenseSelector } from "@/app/useExpenseSelector";

function RecentTransaction({
  expenseStore,
}: {
  expenseStore: UseExpenseSelector;
}) {
  const [recentTransaction, setRecentTransaction] = useState<ExpenseList[]>([]);
  const date = new CDate();
  useEffect(() => {
    const expenseListAll = expenseStore.getPeriod({
      begin: date.full,
      end: date.full,
    });
    if (expenseListAll) setRecentTransaction(expenseListAll);
  }, [expenseStore.get()]);
  return (
    <section className="mt-5">
      <div className="flex justify-between text-sm font-bold ">
        <span>Giao dịch gầy đây</span>
        <Link
          href={"/" + useQueryParams().paramsString()}
          className="text-c-green"
        >
          Xem tất cả
        </Link>
      </div>

      <ul className="mt-2 flex max-h-64 flex-col gap-4 overflow-auto rounded-2xl bg-gray-100 px-3 py-5 scrollbar-none">
        {recentTransaction.length ? (
          recentTransaction.map((expense, index) => {
            const group = findExpenseGroup(expense.group);
            return (
              <ItemExpense
                key={index}
                type={group?.type || "expense"}
                kind={group?.title || ""}
                describe={expense.describe || ""}
                value={expense.money | 0}
                icon={group?.iconFa?.icon || faPaw}
                color={(group?.color as `#${string}`) || "#F875AA"}
              />
            );
          })
        ) : (
          <span className="w-full text-center text-slate-600">
            Không có giao dịch
          </span>
        )}
      </ul>
    </section>
  );
}

export default RecentTransaction;
