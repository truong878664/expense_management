import { faArrowDown, faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ItemExpense from "../expense/ItemExpense";
import CDate from "@/function/CDate";
import { ExpenseList } from "@/app/expenseSlice";
import { ExpenseSelector } from "@/app/expenseSelector";
import Money from "@/function/formatMoney";
import copy from "@/function/copy";
import { findExpenseGroup } from "@/function/groupExpenseList";

export function ReportMoney({
  expenseStore,
}: {
  expenseStore: ExpenseSelector;
}) {
  const [reportPeriod, setReportPeriod] = useState<"week" | "month">("month");
  const periodTransToVietNam = {
    week: "Tuần",
    month: "Tháng",
  };

  const DateObject = new CDate();
  const DateObjectPast = new CDate().setTime({ month: DateObject.month - 1 });

  const [dataReportPast, setDataReportPast] = useState<ExpenseList[]>([]);
  const [dataReport, setDataReport] = useState<ExpenseList[]>([]);

  const [sumReportPast, setSumReportPast] = useState<number>(0);
  const [sumReport, setSumReport] = useState<number>(0);
  const [mostExpense, setMostExpense] = useState([]);

  useEffect(() => {
    const expenseMonthPastData = expenseStore.getMonth({
      month: DateObjectPast.month,
      year: DateObjectPast.year,
    });
    const expenseMonthData = expenseStore.getMonth({
      month: DateObject.month,
      year: DateObject.year,
    });

    if (expenseMonthPastData?.list) {
      setDataReportPast(expenseMonthPastData.list);
      setSumReportPast(expenseStore.total(expenseMonthPastData.list));
    }
    if (expenseMonthData?.list) {
      setDataReport(expenseMonthData.list);
      setSumReport(expenseStore.total(expenseMonthData.list));
    }
  }, [expenseStore.get()]);

  // console.log("data period", expenseStore.getPeriod(DateObject.week));
  useEffect(() => {
    setMostExpense(
      copy(dataReport)
        .sort(
          (first: ExpenseList, second: ExpenseList) =>
            second.money - first.money,
        )
        .slice(0, 3),
    );
  }, [dataReport]);

  const maxExpenseTotal = Math.max(sumReport, sumReportPast);
  const percentComparedBefore = Math.floor(
    (Math.abs(sumReport - sumReportPast) / sumReportPast) * 100,
  );

  return (
    <section className="mt-5">
      <div className="flex justify-between text-sm font-bold ">
        <span>Báo cáo chi tiêu</span>
        <button className="text-c-green">Xem báo cáo</button>
      </div>

      <div className="mt-2 rounded-2xl bg-gray-100 px-3 py-5">
        {/* select time period */}
        <div
          data-time-active={reportPeriod}
          className="user-select-none group relative flex w-full rounded-md bg-gray-200 text-center text-sm font-bold"
        >
          <div className="absolute top-0 h-full w-1/2 rounded-md bg-gray-300 transition-all duration-300 group-data-[time-active='month']:left-1/2 group-data-[time-active='week']:left-0"></div>
          <button
            onClick={() => {
              setReportPeriod("week");
            }}
            className="active z-1 w-1/2 cursor-pointer py-0.5 text-gray-500 group-data-[time-active='week']:text-gray-800"
          >
            Tuần
          </button>
          <button
            onClick={() => {
              setReportPeriod("month");
            }}
            className="z-1 w-1/2 cursor-pointer py-0.5 text-gray-500 group-data-[time-active='month']:text-gray-800"
          >
            Tháng
          </button>
        </div>
        {/* end select time period */}

        <div className="mt-4">
          <div className="">
            {/* report money */}
            <div className="">
              <span className="block text-2xl font-bold">
                {Money.format(sumReport)}
              </span>
              <div className="flex gap-1 text-sm">
                <span>
                  Tổng chi tiêu đã chi
                  <span className="lowercase">
                    {" "}
                    {periodTransToVietNam[reportPeriod]}{" "}
                  </span>
                  này
                </span>
                <span
                  data-fluctuation={
                    sumReport < sumReportPast ? "decrement" : "increment"
                  }
                  className="group flex gap-2 font-bold data-[fluctuation='decrement']:text-c-green data-[fluctuation='increment']:text-red-600"
                >
                  <span className="grid h-5 w-5 place-content-center rounded-full bg-slate-200 group-data-[fluctuation='decrement']:rotate-0 group-data-[fluctuation='increment']:rotate-180">
                    <FontAwesomeIcon icon={faArrowDown} />
                  </span>
                  <span>
                    {isNaN(percentComparedBefore) ? 0 : percentComparedBefore}%
                  </span>
                </span>
              </div>
            </div>
            {/* Chart */}
            <div className="flex h-32 w-full items-center justify-center py-2 text-gray-700">
              <div className="relative flex h-full w-3/5 items-end justify-evenly border-b">
                <button
                  style={{
                    height: (sumReportPast / maxExpenseTotal) * 100 + "%",
                  }}
                  className="w-10 rounded-t-md bg-red-400 opacity-50 transition-all duration-300 [&.active]:opacity-100"
                ></button>
                <button
                  style={{ height: (sumReport / maxExpenseTotal) * 100 + "%" }}
                  className="active w-10 rounded-t-md bg-red-400 opacity-50 transition-all duration-300 [&.active]:opacity-100"
                ></button>
                <div className="absolute left-full top-0 flex h-full flex-col items-center justify-between text-xs">
                  <span>{Math.ceil(maxExpenseTotal / 1000000)}M</span>
                  <span>0</span>
                </div>
                <div className="absolute left-0 top-full flex w-full justify-evenly text-xs">
                  <span>{periodTransToVietNam[reportPeriod]} trước</span>
                  <span>{periodTransToVietNam[reportPeriod]} này</span>
                </div>
              </div>
            </div>
            {/* end Chart */}
            {/* spend the most */}
            <div className="mt-8">
              <span className="block font-bold">
                Chi tiêu nhiều nhất trong{" "}
                <span className="lowercase">
                  {" "}
                  {periodTransToVietNam[reportPeriod]}{" "}
                </span>
              </span>
              <ul className="mt-2 flex flex-col gap-4">
                {mostExpense.map((expense: ExpenseList, index) => {
                  const group = findExpenseGroup(expense.group);
                  return (
                    <ItemExpense
                      key={index}
                      type={group?.type || "expense"}
                      kind={group?.title || ""}
                      describe={Money.format(expense.money).toString()}
                      value={
                        Math.floor((expense.money / sumReport) * 100) + "%"
                      }
                      icon={group?.iconFa?.icon || faPaw}
                      color={(group?.color as `#${string}`) || "#F875AA"}
                    />
                  );
                })}
              </ul>
            </div>
            {/* end spend the most */}
          </div>
        </div>
      </div>
    </section>
  );
}
