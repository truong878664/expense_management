"use client";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitStateExpense, extend } from "../createExpenseSlice";
import { gsap } from "gsap";

function NotePage() {
  const noteRef: RefObject<HTMLDivElement> = useRef(null);
  const noteWrapperRef: RefObject<HTMLDivElement> = useRef(null);
  const buttonSubmitRef: RefObject<HTMLButtonElement> = useRef(null);
  const route = useRouter();
  const dispatch = useDispatch();
  const expense = useSelector(
    (state: { createExpense: InitStateExpense }) => state.createExpense,
  );
  const onBack = () => {
    gsap.fromTo(
      noteWrapperRef.current,
      { translateX: "0" },
      { translateX: "100%", duration: 0.3, onComplete: route.back },
    );
  };
  const onSubmit = () => {
    dispatch(extend({ describe: noteRef.current?.textContent || "" }));
    onBack();
  };
  const onValidateSubmit = (e: any) => {
    if (buttonSubmitRef.current)
      buttonSubmitRef.current.disabled = !e.target.textContent;
  };
  useEffect(() => {
    gsap.fromTo(
      noteWrapperRef.current,
      { translateX: "100%", opacity: 0 },
      { translateX: "0", duration: 0.3, opacity: 1 },
    );
    noteRef.current?.focus();
  }, []);
  return (
    <div ref={noteWrapperRef} className="flex h-full w-full flex-col">
      <div className="mb-2 flex justify-between border-b px-4 py-2 font-bold capitalize">
        <button onClick={onBack} className="px-3">
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span>Ghi chú</span>
        <button
          ref={buttonSubmitRef}
          onClick={onSubmit}
          className="disabled:opacity-50"
        >
          Xong
        </button>
      </div>
      <div className="flex-1 px-4">
        <div
          ref={noteRef}
          className="h-full min-h-[100px] outline-none focus:outline-none"
          contentEditable
          placeholder="Thêm ghi chú..."
          onInput={onValidateSubmit}
          suppressContentEditableWarning
        >
          {expense.describe}
        </div>
      </div>
    </div>
  );
}

export default NotePage;
