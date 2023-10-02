"use client";
import iconList from "@/function/Icon";
import ItemGroupExpense from "./ItemGroupExpense";

function GroupExpense({
  title,
  data,
}: {
  title: string;
  data: { id: string | number; title: string; icon: any; color: string }[];
}) {
  return (
    <div className="">
      <div className="sticky top-0 mt-4 bg-slate-100 px-2 py-1 text-sm font-bold text-slate-700">
        {title}
      </div>
      <div className="bg-slate-200/80 px-2">
        {data.map((item, index) => {
          const activeIcon = iconList.find((icon) => icon.id === item.icon);
          return (
            <ItemGroupExpense
              key={index}
              title={item.title}
              color={item.color}
              icon={activeIcon?.icon}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GroupExpense;
