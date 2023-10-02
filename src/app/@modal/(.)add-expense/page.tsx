"use client";
import { LayoutAddExpenseContext } from "@/app/context/LayoutAddExpenseContext";
import PageAddExpense from "@/components/app/PageAddExpense";
import { useContext } from "react";

function AddPage() {
  const { onDismiss } = useContext(LayoutAddExpenseContext);
  return <PageAddExpense onClick={onDismiss} />;
}

export default AddPage;
