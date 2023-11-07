"use client";
import ShowMoney from "@/components/Overview/ShowMoney";
import Wallet from "@/components/app/Wallet";
import ItemExpense from "@/components/expense/ItemExpense";
import {
  faArrowDown,
  faBell,
  faCircleQuestion,
  faEye,
  faPaw,
  faRibbon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

function OverView() {
  const [reportPeriod, setReportPeriod] = useState<"week" | "month">("month");
  const periodTransToVietNam = {
    week: "Tuần",
    month: "Tháng",
  };

  return (
    <section className="h-full overflow-y-auto p-4">
      <header className="flex items-center justify-between">
        <div className="leading-3">
          <ShowMoney money={9999912} />
          <span className="text-sm leading-3">
            <span className="mr-1">Tổng số dư</span>
            <FontAwesomeIcon
              className="text-gray-500"
              icon={faCircleQuestion}
            />
          </span>
        </div>
        <button className="text-xl">
          <FontAwesomeIcon icon={faBell} />
        </button>
      </header>
      <section className="mt-4 w-full rounded-2xl bg-gray-100 font-bold ">
        <div className="flex justify-between border-b p-3">
          <span>Ví của tôi</span>
          <button className="text-c-green">Xem tất cả</button>
        </div>
        <div className="flex justify-between p-3">
          <Wallet />
          <span>980,000 đ</span>
        </div>
      </section>
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
                <span className="block text-2xl font-bold">3,000,000 đ</span>
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
                    data-fluctuation="decrement"
                    className="group flex gap-2 font-bold data-[fluctuation='decrement']:text-red-600 data-[fluctuation='increment']:text-c-green"
                  >
                    <span className="grid h-5 w-5 place-content-center rounded-full bg-slate-200 group-data-[fluctuation='decrement']:rotate-0 group-data-[fluctuation='increment']:rotate-180">
                      <FontAwesomeIcon icon={faArrowDown} />
                    </span>
                    <span>67%</span>
                  </span>
                </div>
              </div>
              {/* Chart */}
              <div className="flex h-32 w-full items-center justify-center py-2 text-gray-700">
                <div className="relative flex h-full w-3/5 items-end justify-evenly border-b">
                  <button
                    style={{ height: reportPeriod === "week" ? "70%" : "10%" }}
                    className="active w-10 rounded-t-md bg-red-400 opacity-50 transition-all duration-300 [&.active]:opacity-100"
                  ></button>
                  <button
                    style={{ height: reportPeriod === "week" ? "20%" : "80%" }}
                    className="w-10 rounded-t-md bg-red-400 opacity-50 transition-all duration-300 [&.active]:opacity-100"
                  ></button>
                  <div className="absolute left-full top-0 flex h-full flex-col items-center justify-between text-xs">
                    <span>12M</span>
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
                <span className="block font-bold">Chi tiêu nhiều nhất</span>
                <ul className="mt-2 flex flex-col gap-4">
                  <ItemExpense
                    type="expense"
                    kind={"Không có tiêu đề"}
                    describe={"100.000"}
                    value={"10%"}
                    icon={faPaw}
                    color={"#F875AA"}
                  />
                  <ItemExpense
                    type="expense"
                    kind={"Không có tiêu đề"}
                    describe={"100.000"}
                    value={"10%"}
                    icon={faPaw}
                    color={"#F875AA"}
                  />
                </ul>
              </div>
              {/* end spend the most */}
            </div>
          </div>
        </div>
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
        <section className="mt-5">
          <div className="flex justify-between text-sm font-bold ">
            <span>Giao dịch gầy đây</span>
            <Link href={"/"} className="text-c-green">
              Xem tất cả
            </Link>
          </div>

          <ul className="mt-2 flex flex-col gap-4 rounded-2xl bg-gray-100 px-3 py-5">
            <ItemExpense
              type="expense"
              kind={"Không có tiêu đề"}
              describe={"nothing"}
              value={"100000"}
              icon={faRibbon}
              color={"#F875AA"}
            />
            <ItemExpense
              type="income"
              kind={"Không có tiêu đề"}
              describe={"nothing"}
              value={"1209412"}
              icon={faPaw}
              color={"#F875AA"}
            />
          </ul>
        </section>
      </section>
    </section>
  );
}

export default OverView;
