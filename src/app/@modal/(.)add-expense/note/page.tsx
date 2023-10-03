"use client";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { RefObject, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitStateExpense, extend } from "../createExpenseSlice";

function NotePage() {
  const noteRef: RefObject<HTMLDivElement> = useRef(null);
  const buttonSubmitRef: RefObject<HTMLButtonElement> = useRef(null);
  const route = useRouter();
  const dispatch = useDispatch();
  const expense = useSelector(
    (state: { createExpense: InitStateExpense }) => state.createExpense,
  );
  // console.log(expense.note);
  // const [note, setNote] = useState(expense.note);
  const onSubmit = () => {
    dispatch(extend({ note: noteRef.current?.textContent || "" }));
    route.back();
  };
  const onValidateSubmit = (e: any) => {
    // setNote(e.target.textContent);
    if (buttonSubmitRef.current)
      buttonSubmitRef.current.disabled = !e.target.textContent;
  };
  return (
    <div className="h-full w-full animate-show-left border-l">
      <div className="mb-2 flex justify-between border-b px-4 py-2 font-bold capitalize">
        <button onClick={route.back} className="px-3">
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
      <div className="px-4">
        <div
          ref={noteRef}
          className="min-h-[100px] outline-none"
          contentEditable
          placeholder="Thêm ghi chú"
          onInput={onValidateSubmit}
          suppressContentEditableWarning
        >
          {expense.note}
        </div>
      </div>
    </div>
  );
}

export default NotePage;
