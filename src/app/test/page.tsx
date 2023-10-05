"use client";
import CDate from "@/function/CDate";
import {
  InitialState,
  decrement,
  increment,
  incrementByAmount,
} from "./counterSlice";
import { useDispatch, useSelector } from "react-redux";
import DataExpense from "@/function/DataExpense";

function PageTest() {
  const dispatch = useDispatch();
  const count = useSelector(
    (state: { counter: InitialState }) => state.counter.value,
  );

  const cDate = new CDate();
  return (
    <div className="">
      <div className="flex gap-10">
        <button onClick={() => dispatch(decrement())}>click -</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>click +</button>
        <button onClick={() => dispatch(incrementByAmount({ value: 10 }))}>
          click 10
        </button>
      </div>
    </div>
  );
}

export default PageTest;
