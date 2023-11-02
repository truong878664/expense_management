"use client";
import { extend } from "@/app/@modal/(.)add-expense/createExpenseSlice";
import CustomDate from "@/function/CDate";
import {
  MouseEventHandler,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import OptionSelectDate from "./OptionSelectDate";
import Button from "../app/Button";
import WrapperSelect from "../app/WrapperSelect";

type DateSelect = {
  handleRemove: (reactElement: null) => void;
};

function DateSelect({ handleRemove }: DateSelect) {
  const removeButtonRef: RefObject<HTMLButtonElement> = useRef(null);
  const dispatch = useDispatch();
  const [optionDateComponent, setOptionDateComponent] =
    useState<ReactElement | null>(null);

  const onDispatchDate: MouseEventHandler = (e) => {
    const { minusDate } = (e.target as HTMLButtonElement).dataset;
    const { date, month, year } = new CustomDate().calculateDay(
      Number(minusDate),
    );
    dispatch(extend({ date, month, year }));
    removeButtonRef.current?.click();
  };

  const onOptionDate = {
    show() {
      setOptionDateComponent(
        <OptionSelectDate handleRemove={onOptionDate.remove} />,
      );
    },
    remove(type: "all" | "option") {
      if (type === "all") removeButtonRef.current?.click();
      setOptionDateComponent(null);
    },
  };

  return (
    <>
      <WrapperSelect handleRemove={handleRemove} removeButton={removeButtonRef}>
        <Button data-minus-date="-2" onClick={onDispatchDate}>
          Hôm kia
        </Button>
        <Button data-minus-date="-1" onClick={onDispatchDate}>
          Hôm qua
        </Button>
        <Button data-minus-date="0" onClick={onDispatchDate}>
          Hôm nay
        </Button>
        <Button data-minus-date="-3" onClick={onOptionDate.show}>
          Tùy chỉnh
        </Button>
      </WrapperSelect>
      {optionDateComponent}
    </>
  );
}
export default DateSelect;
