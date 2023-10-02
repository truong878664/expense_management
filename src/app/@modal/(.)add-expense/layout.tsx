"use client";

import { useRouter } from "next/navigation";
import { RefObject, useEffect, useRef } from "react";
import { LayoutAddExpenseContext } from "../../context/LayoutAddExpenseContext";

function LayoutAddExpense({ children }: { children: React.ReactNode }) {
  const addExpenseWrapperRef: RefObject<HTMLDivElement> = useRef(null);
  const route = useRouter();
  const onDismiss = () => {
    if (addExpenseWrapperRef.current) {
      addExpenseWrapperRef.current!.dataset.active = "";
    }
    setTimeout(() => {
      route.back();
    }, 400);
  };

  useEffect(() => {
    addExpenseWrapperRef.current!.dataset.active = "show";
  }, []);

  return (
    <div className="fixed-screen z-11">
      <div className="absolute-screen bg-black/10 backdrop-blur-[1px]"></div>
      <div
        data-active=""
        id="add-expense-wrapper"
        ref={addExpenseWrapperRef}
        className="absolute bottom-0 left-0 top-14 w-full translate-y-full rounded-t-3xl border-t bg-slate-100 py-2 transition-all duration-500 data-[active='show']:translate-y-0 "
      >
        <LayoutAddExpenseContext.Provider value={{ onDismiss }}>
          {children}
        </LayoutAddExpenseContext.Provider>
      </div>
    </div>
  );
}

export default LayoutAddExpense;
