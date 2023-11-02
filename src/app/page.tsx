"use client";
import DetailExpense from "@/components/Home/DetailExpense";
import Header from "@/components/Home/Header";
import useQueryParams from "@/hooks/useQueryParams";
export default function Home() {
  const params = useQueryParams();
  const dateNow = new Date().toLocaleDateString(
    process.env.LOCAL_CODE,
    process.env.TIME_ZONE as any,
  );
  const activeDate = params.get("date") || dateNow;

  return (
    <div className="flex h-full flex-col">
      <Header activeDate={activeDate} />
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <DetailExpense />
      </div>
    </div>
  );
}
