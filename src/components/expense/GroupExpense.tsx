"use client";
import iconList from "@/function/Icon";
import ItemGroupExpense from "./ItemGroupExpense";
import { useDispatch } from "react-redux";
import { extend } from "@/app/@modal/(.)add-expense/createExpenseSlice";
import { expenseList } from "@/function/groupExpenseList";
import { useRouter } from "next/navigation";

function GroupExpense({
  title,
  data,
  onBack,
}: {
  title: string;
  data: string[] | number[];
  onBack: () => void;
}) {
  const dispatch = useDispatch();
  const onSelectGroup = (id: string | number) => {
    dispatch(extend({ group: id }));
    onBack();
  };
  return (
    <div className="">
      <div className="sticky top-0 mt-4 bg-slate-100 px-2 py-1 text-sm font-bold text-slate-700">
        {title}
      </div>
      <div className="bg-slate-200/80 px-2">
        {data.map((item, index) => {
          const expense:
            | {
                id: string;
                title: string;
                icon: string;
                color: string;
              }
            | undefined = expenseList.find((expense) => expense.id === item);
          const activeIcon = iconList.find((icon) => icon.id === expense?.icon);

          return (
            <ItemGroupExpense
              onClick={() => onSelectGroup(expense?.id || "not found")}
              key={index}
              title={expense?.title || "no title"}
              color={expense?.color || "#cccccc"}
              icon={activeIcon?.icon}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GroupExpense;
