"use client";

import { useRouter } from "next/navigation";
import { RefObject, useEffect, useRef } from "react";
import { LayoutAddExpenseContext } from "@/context/LayoutAddExpenseContext";
import { gsap } from "gsap";

function LayoutAddExpense({ children }: { children: React.ReactNode }) {
  const addExpenseWrapperRef: RefObject<HTMLDivElement> = useRef(null);
  const route = useRouter();
  const onDismiss = () => {
    gsap.fromTo(
      addExpenseWrapperRef.current,
      { translateY: "0" },
      {
        translateY: "100%",
        duration: 0.3,
        onComplete: route.back,
      },
    );
  };

  useEffect(() => {
    gsap.fromTo(
      addExpenseWrapperRef.current,
      { translateY: "100%", opacity: 0 },
      { translateY: "0", duration: 0.3, opacity: 1 },
    );
  }, []);

  return (
    <div className="fixed-screen z-11 grid items-end">
      <div className="absolute-screen bg-black/10 backdrop-blur-[1px]"></div>
      <div
        data-active=""
        id="add-expense-wrapper"
        ref={addExpenseWrapperRef}
        className="relative h-[calc(100%_-_56px)] w-full translate-y-full overflow-auto rounded-t-3xl bg-slate-100 py-2 scrollbar-none"
      >
        <LayoutAddExpenseContext.Provider value={{ onDismiss }}>
          {children}
        </LayoutAddExpenseContext.Provider>
      </div>
    </div>
  );
}

export default LayoutAddExpense;
