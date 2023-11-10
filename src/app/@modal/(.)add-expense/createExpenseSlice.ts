import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CDate from "@/function/CDate";

export interface InitStateExpense {
    id: number | string;
    money: number;
    group: string | number;
    describe?: string;
    date: number;
    month: number;
    year: number;
    day: string;
    timestamp: number;
}

const initialState: InitStateExpense = {
    id: 0,
    money: 0,
    group: "",
    describe: "",
    date: new CDate().date,
    month: new CDate().month,
    year: new CDate().year,
    day: new CDate().day,
    timestamp: new CDate().timestamp,
};

const actions = {
    extend(state: any, action: PayloadAction<Partial<InitStateExpense>>) {
        for (const key in action.payload) {
            state[key] = action.payload[key as keyof InitStateExpense];
        }
        state.timestamp = new CDate().setTime({
            date: state.date,
            month: state.month,
            year: state.year,
        }).timeStamp;
    },
    reset(state: any) {
        for (const key in initialState) {
            state[key] = initialState[key as keyof InitStateExpense];
        }
    },
};
const createExpenseSlice = createSlice({
    name: "createExpense",
    initialState,
    reducers: actions,
});

export const { extend, reset } = createExpenseSlice.actions;
export default createExpenseSlice.reducer;
