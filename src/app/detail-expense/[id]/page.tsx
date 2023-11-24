"use client";

import { deleteExpense } from "@/app/expenseSlice";
import useExpenseSelector from "@/app/useExpenseSelector";
import Button from "@/components/app/Button";
import HeaderExpense from "@/components/app/HeaderExpense";
import WrapperSelect from "@/components/app/WrapperSelect";
import Money from "@/function/formatMoney";
import { findExpenseGroup } from "@/function/groupExpenseList";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faBlender,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import gsap from "gsap";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

function IdDetailExpense({ params }: { params: { id: number | string } }) {
  const detailExpenseWrapperRef: RefObject<HTMLElement> = useRef(null);
  const removeButtonRef: RefObject<HTMLButtonElement> = useRef(null);

  const [ConfirmDelete, setConFirmDelete] = useState<ReactNode>(null);

  const route = useRouter();
  const dispatch = useDispatch();

  const expenseSelector = useExpenseSelector();
  const expense = expenseSelector.getById(params.id);
  const group = findExpenseGroup(expense?.group);

  if (!expense) redirect("/");

  const onDelete = () => {
    dispatch(
      deleteExpense({
        date: expense?.date,
        month: expense?.month,
        year: expense?.year,
        id: expense?.id,
      }),
    );
    onBack();
  };

  const onBack = () => {
    gsap.fromTo(
      detailExpenseWrapperRef.current,
      { translateX: "0" },
      {
        translateX: "100%",
        duration: 0.3,
        onComplete: () => {
          route.back();
        },
      },
    );
  };

  const onToggleConfirm = () => {
    setConFirmDelete(
      <WrapperSelect
        handleRemove={() => {
          setConFirmDelete(null);
        }}
        removeButton={removeButtonRef}
      >
        <Button className="font-normal !text-gray-600">Bạn có muốn xóa?</Button>
        <Button onClick={onDelete} className="!text-red-500">
          Xóa
        </Button>
      </WrapperSelect>,
    );
  };

  useEffect(() => {
    gsap.fromTo(
      detailExpenseWrapperRef.current,
      { translateX: "100%", opacity: 0 },
      { translateX: "0", duration: 0.3, opacity: 1 },
    );
  }, []);

  return (
    <>
      <section
        ref={detailExpenseWrapperRef}
        className="z-1 h-full w-full overflow-auto bg-slate-100 pb-10 scrollbar-none"
      >
        <HeaderExpense
          handleLeft={{
            callback: onBack,
            title: (
              <span>
                <FontAwesomeIcon className="mr-2" icon={faAngleLeft} />
                Trở lại
              </span>
            ),
          }}
          handleRight={{
            callback: () => {
              console.log(123);
            },
            title: "Sửa",
            classNameButtonRight: "",
          }}
        />
        <div className="mt-8">
          <div className=" bg-gray-200/70 p-3">
            <div className="flex w-full gap-2">
              <div
                style={{ backgroundColor: group?.color }}
                className="grid h-10 w-10 shrink-0 place-content-center rounded-full text-2xl text-white shadow-sm"
              >
                <FontAwesomeIcon icon={group?.iconFa?.icon || faBlender} />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-xl font-bold">{group?.title}</span>
                <span className="block max-w-full break-all text-gray-700">
                  {expense?.describe}
                </span>
                <span
                  className={classNames("mt-1 text-3xl", {
                    "text-red-500": group?.type === "expense",
                    "text-green-500": group?.type === "income",
                  })}
                >
                  {Money.format(expense?.money || 0)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <span className="w-10 text-center">
                <FontAwesomeIcon className="text-gray-500" icon={faCalendar} />
              </span>
              <span>
                {expense?.day}, {expense?.date} tháng {expense?.month} năm{" "}
                {expense?.year}
              </span>
            </div>

            <div className="mt-2 flex gap-2">
              <span className="w-10 text-center">
                <FontAwesomeIcon className="text-orange-400" icon={faWallet} />
              </span>
              <span>{expenseSelector.get().wallet}</span>
            </div>
          </div>

          <div className="mt-8 bg-gray-200/70">
            <button
              onClick={onToggleConfirm}
              className="h-full w-full py-3 text-sm font-bold text-red-600"
            >
              Xóa giao dịch
            </button>
          </div>
        </div>
      </section>
      {ConfirmDelete}
    </>
  );
}

export default IdDetailExpense;
