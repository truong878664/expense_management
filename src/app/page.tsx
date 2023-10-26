"use client";
import DetailExpense from "@/components/Home/DetailExpense";
import Header from "@/components/Home/Header";
import useQueryParams from "@/hooks/useQueryParams";

export default function Home() {
  const params = useQueryParams();
  const dateNow = new Date().toLocaleDateString();
  const activeDate = params.get("date") || dateNow;

  return (
    <div className="flex h-full flex-col">
      <Header activeDate={activeDate} />
      <div className="flex-1 overflow-auto">
        <DetailExpense activeDate={activeDate} />
      </div>
    </div>
  );
}
