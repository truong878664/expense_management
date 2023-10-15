"use client";
import PageAddExpense from "@/components/app/PageAddExpense";
import LayoutAddExpense from "../@modal/(.)add-expense/layout";
import { useRouter } from "next/navigation";

function AddExpense() {
  const router = useRouter();
  return (
    <LayoutAddExpense>
      <PageAddExpense handleDismiss={router.back} />;
    </LayoutAddExpense>
  );
}

export default AddExpense;
