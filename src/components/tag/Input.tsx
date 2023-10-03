"use client";
import Money from "@/function/formatMoney";
import { ChangeEvent, useState } from "react";

interface Input {
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  size?: number;
  src?: string;
  step?: number | any;
  value?: string | number;
  className?: string;
  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type, ...rest }: Input) {
  const { onChange, ...other } = rest;
  const [value, setValue] = useState<string | number>(0);
  const onchangeLocal = (e: any) => {
    const value = Money.formatNumber(e.target.value);
    setValue(value);
    rest.onChange?.(e);
  };
  return (
    <input value={value} onChange={onchangeLocal} type={type} {...other} />
  );
}

export default Input;
