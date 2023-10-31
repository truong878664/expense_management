"use client";
import DetailExpense from "@/components/Home/DetailExpense";
import Header from "@/components/Home/Header";
import Notification from "@/components/app/Notification";
import useQueryParams from "@/hooks/useQueryParams";
import { useState } from "react";
export default function Home() {
  const params = useQueryParams();
  const dateNow = new Date().toLocaleDateString();
  const activeDate = params.get("date") || dateNow;
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex h-full flex-col">
      {loading && (
        <div>
          <Notification status="error" />
        </div>
      )}
      <button
        onClick={() => {
          setLoading(!loading);
        }}
        className="fixed left-1/2 top-1/2"
      >
        click
      </button>
      <Header activeDate={activeDate} />
      <div className="flex-1 overflow-auto">
        <DetailExpense />
      </div>
    </div>
  );
}
