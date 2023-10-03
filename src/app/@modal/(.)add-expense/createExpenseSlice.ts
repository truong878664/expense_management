import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InitStateExpense {
    money: number;
    group: string | number;
    note?: string;
    date: string;
}

const initialState: InitStateExpense = {
    money: 0,
    group: "",
    note: "",
    date: "",
};

const actions = {
    extend(state: any, action: PayloadAction<Partial<InitStateExpense>>) {
        for (const key in action.payload) {
            state[key] = action.payload[key as keyof InitStateExpense];
        }
    },
    reset(state: any) {
        for (const key in initialState) {
            state[key] = initialState[key as keyof InitStateExpense]
        }
    }
};
const createExpenseSlice = createSlice({
    name: "createExpense",
    initialState,
    reducers: actions,
});

export const { extend, reset } = createExpenseSlice.actions;
export default createExpenseSlice.reducer;
