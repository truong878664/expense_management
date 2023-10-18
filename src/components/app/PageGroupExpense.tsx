"use client";
import {
  faAngleLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import GroupExpense from "../expense/GroupExpense";
import { groupExpenseList } from "@/function/groupExpenseList";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function PageGroupExpense() {
  const route = useRouter();
  const groupRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      groupRef.current,
      { translateX: "100%", opacity: 0 },
      { translateX: "0", duration: 0.3, opacity: 1 },
    );
  }, []);

  const onBack = () => {
    gsap.fromTo(
      groupRef.current,
      { translateX: "0" },
      { translateX: "100%", duration: 0.3, onComplete: route.back },
    );
  };
  return (
    <div ref={groupRef} className="flex h-full w-full flex-col">
      <div className="mb-2 flex justify-between border-b px-4 py-2 font-bold capitalize">
        <button onClick={onBack} className="px-3">
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span>Chọn nhóm</span>
        <button className="px-3">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden">
        {groupExpenseList.map((item, index) => (
          <GroupExpense
            onBack={onBack}
            title={item.group}
            key={index}
            data={item.data}
          />
        ))}
      </div>
    </div>
  );
}

export default PageGroupExpense;
