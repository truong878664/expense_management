"use client";
import {
  faAngleLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import GroupExpense from "../expense/GroupExpense";
import { groupExpenseList } from "@/function/groupExpenseList";

function PageGroupExpense() {
  const route = useRouter();

  return (
    <div className="animate-show-left flex h-full w-full flex-col border-l shadow-sm">
      <div className="mb-2 flex justify-between border-b px-4 py-2 font-bold capitalize">
        <button onClick={route.back} className="px-3">
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span>Chọn nhóm</span>
        <button className="px-3">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden">
        {groupExpenseList.map((item, index) => (
          <GroupExpense title={item.group} key={index} data={item.data} />
        ))}
      </div>
    </div>
  );
}

export default PageGroupExpense;
