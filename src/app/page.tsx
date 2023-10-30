"use client";
import DetailExpense from "@/components/Home/DetailExpense";
import Header from "@/components/Home/Header";
import CDate from "@/function/CDate";
import useQueryParams from "@/hooks/useQueryParams";

export default function Home() {
  const params = useQueryParams();
  const activeDate = params.get("date") || new CDate().today;
  return (
    <div className="flex h-full flex-col">
      <Header activeDate={activeDate} />
      <div className="flex-1 overflow-auto">
        <DetailExpense />
      </div>
    </div>
  );
}
