import { faArrowDown, faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ItemExpense from "../expense/ItemExpense";
import CDate from "@/function/CDate";
import { ExpenseList } from "@/app/expenseSlice";
import Money from "@/function/formatMoney";
import copy from "@/function/copy";
import { findExpenseGroup } from "@/function/groupExpenseList";
import { UseExpenseSelector } from "@/app/useExpenseSelector";

function ReportMoney({ expenseStore }: { expenseStore: UseExpenseSelector }) {
  const [reportPeriod, setReportPeriod] = useState<"week" | "month">("month");

  const periodTransToVietNam = {
    week: "Tuần",
    month: "Tháng",
  };

  const DateObject = new CDate();

  const [dataReportPast, setDataReportPast] = useState<ExpenseList[]>([]);
  const [dataReport, setDataReport] = useState<ExpenseList[]>([]);

  const [sumReportPast, setSumReportPast] = useState<number>(0);
  const [sumReport, setSumReport] = useState<number>(0);
  const [mostExpense, setMostExpense] = useState([]);

  const onSetDataReport = (period: "week" | "month") => {
    const periods = {
      week: {
        now: DateObject.dateWeek,
        past: DateObject.dateLastWeek,
      },
      month: {
        now: DateObject.dateMonth,
        past: DateObject.dateLastMonth,
      },
    };
    const expenseMonthPastData = expenseStore.getPeriod(periods[period].past);
    const expenseMonthData = expenseStore.getPeriod(periods[period].now);

    if (expenseMonthPastData) {
      setDataReportPast(expenseMonthPastData);
      setSumReportPast(expenseStore.total(expenseMonthPastData));
    }
    if (expenseMonthData) {
      setDataReport(expenseMonthData);
      setSumReport(expenseStore.total(expenseMonthData));
    }
  };

  useEffect(() => {
    setReportPeriod("month");
    onSetDataReport("month");
  }, [expenseStore.get()]);

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
  const maxChart = Math.round(maxExpenseTotal / 1000);
  const isMillion = maxExpenseTotal > 10 ** 6;
  const valueShowMaxChart = isMillion
    ? Math.ceil(maxChart / 1000)
    : Math.ceil(maxChart);

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
              onSetDataReport("week");
            }}
            className="active z-1 w-1/2 cursor-pointer py-0.5 text-gray-500 group-data-[time-active='week']:text-gray-800"
          >
            Tuần
          </button>
          <button
            onClick={() => {
              setReportPeriod("month");
              onSetDataReport("month");
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
                  <span className="grid h-5 w-5 place-content-center rounded-full bg-slate-200 transition-transform duration-500 group-data-[fluctuation='decrement']:rotate-0 group-data-[fluctuation='increment']:rotate-180">
                    <FontAwesomeIcon icon={faArrowDown} />
                  </span>
                  <span>
                    {isNaN(percentComparedBefore)
                      ? 0
                      : !isFinite(percentComparedBefore)
                      ? Money.format(sumReport)
                      : percentComparedBefore}
                    {isFinite(percentComparedBefore) && "%"}
                  </span>
                </span>
              </div>
            </div>
            {/* Chart */}
            <div className="flex h-32 w-full items-center justify-center py-2 text-gray-700">
              <div className="relative flex h-full w-3/5 items-end justify-evenly border-b">
                <button
                  style={{
                    height:
                      (isMillion
                        ? (sumReportPast / 1000000 / valueShowMaxChart) * 100
                        : (sumReportPast / 1000 / valueShowMaxChart) * 100) +
                      "%",
                  }}
                  className="w-10 rounded-t-md bg-red-400 opacity-50 transition-all duration-300 [&.active]:opacity-100"
                ></button>
                <button
                  style={{
                    height:
                      (isMillion
                        ? (sumReport / 1000000 / valueShowMaxChart) * 100
                        : (sumReport / 1000 / valueShowMaxChart) * 100) + "%",
                  }}
                  className="active w-10 rounded-t-md bg-red-400 opacity-50 transition-all duration-300 [&.active]:opacity-100"
                ></button>
                <div className="absolute left-full top-0 flex h-full flex-col items-center justify-between text-xs">
                  <span>
                    {valueShowMaxChart}
                    {isMillion ? "M" : "k"}
                  </span>
                  <span className="font-thin">-</span>
                  <span>-</span>
                  <span className="font-thin">-</span>
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
                {Boolean(mostExpense.length) !== false ? (
                  mostExpense.map((expense: ExpenseList, index) => {
                    const group = findExpenseGroup(expense.group);
                    return (
                      <ItemExpense
                        id={expense.id}
                        key={expense.id}
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
                  })
                ) : (
                  <span className="w-full text-center text-slate-600">
                    Không có giao dịch
                  </span>
                )}
              </ul>
            </div>
            {/* end spend the most */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportMoney;
