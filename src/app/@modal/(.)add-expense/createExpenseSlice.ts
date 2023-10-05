import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CDate from "@/function/CDate";

export interface InitStateExpense {
    id: number | string | null;
    money: number;
    group: string | number;
    describe?: string;
    date: string;
}

const initialState: InitStateExpense = {
    id: null,
    money: 0,
    group: "",
    describe: "",
    date: new CDate().today,
};

const actions = {
    extend(state: any, action: PayloadAction<Partial<InitStateExpense>>) {
        for (const key in action.payload) {
            state[key] = action.payload[key as keyof InitStateExpense];
        }
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
