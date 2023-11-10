"use client";
import HeaderOverview from "@/components/Overview/HeaderOverview";
import RecentTransaction from "@/components/Overview/RecentTransaction";
import ReportMoney from "@/components/Overview/ReportMoney";
import { Expense } from "../expenseSlice";
import { useEffect, useState } from "react";
import expenseSelector from "../expenseSelector";

function OverView() {
  const expenseStore = expenseSelector();

  const [expenseHydrated, setExpenseHydrated] = useState<Expense>();

  useEffect(() => {
    setExpenseHydrated(expenseStore.get());
  }, [expenseStore.get()]);
  return (
    <section className="h-full overflow-y-auto p-4">
      <HeaderOverview
        finalBalance={expenseHydrated?.finalBalance}
        wallet={expenseHydrated?.wallet}
      />
      <ReportMoney expenseStore={expenseStore} />
      <section className="mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-pink-600 via-orange-500 to-orange-400 p-4">
        <div className="flex justify-between gap-1">
          <span className="font-bold text-white">
            Khai thác tối đa MoneyLover với Premium
          </span>
          <span className="flex gap-2 font-black text-[#ffef6c] drop-shadow-[6px_2px_0_#ea580c]">
            <span className="text-6xl">-100</span>
            <span className="text-xl">%</span>
          </span>
        </div>
        <button className="mt-2 rounded-md bg-[#fef2c9] px-4 py-1 font-bold text-[#ff9934]">
          Nâng cấp ngay
        </button>
      </section>
      <RecentTransaction expenseStore={expenseStore} />
    </section>
  );
}

export default OverView;
