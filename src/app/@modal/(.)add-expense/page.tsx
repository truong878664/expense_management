"use client";
import { LayoutAddExpenseContext } from "@/context/LayoutAddExpenseContext";
import PageAddExpense from "@/components/app/PageAddExpense";
import { useContext } from "react";

function AddPage() {
  const { onDismiss } = useContext(LayoutAddExpenseContext);
  return <PageAddExpense handleDismiss={onDismiss} />;
}

export default AddPage;
