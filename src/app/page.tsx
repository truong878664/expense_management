"use client";

import Header from "@/components/Home/Header";
import ItemExpense from "@/components/expense/ItemExpense";
import Money from "@/function/formatMoney";
export default function Home() {
  const array: any = [];
  for (let i = 0; i < 40; i++) {
    array.push("an uong " + i);
  }

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex-1 overflow-auto">
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
              <span className="mr-2 text-4xl font-bold">28</span>
              <div className="flex flex-col justify-center text-sm leading-tight">
                <span>Hôm nay</span>
                <span>tháng 9 năm 2023</span>
              </div>
            </div>
            <span>-10,000</span>
          </div>

          <div className="mt-3">
            {array.map((item: any, index: any) => {
              return (
                <ItemExpense
                  key={index}
                  type={index % 2 ? "expense" : "income"}
                  kind={item}
                  describe="an sang"
                  value={Money.format(
                    ((15100 * index) % 2) + (index * 10000) / 10 + 10000,
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
