import DataExpense from "@/function/DataExpense";
import { createSlice } from "@reduxjs/toolkit";
interface ExpenseList {
    group: number | string;
    describe: string;
    money: number;
    type: "income" | "expense";
}
interface expenseDay {
    [day: number]: {
        initBalanceDay: number;
        finalBalanceDay: number;
        expenseList?: ExpenseList[];
    };
}
interface expenseMonth {
    [month: number]: expenseDay;
}
interface expenseYear {
    [year: number]: expenseMonth;
}
interface InitialState {
    initBalance: number;
    finalBalance: number;
    currency: "vnd" | "usd";
    wallet: string;
    idWallet: string | number;
    data: expenseYear;
}

const dataExpense = new DataExpense();

const initialState: InitialState[] = dataExpense.get;
const actions = {
    add(state: InitialState[]) {
        console.log(state);
    },
};
const expenseSlice = createSlice({
    name: "createExpense",
    initialState,
    reducers: actions,
});

export const { add } = expenseSlice.actions;
export default expenseSlice.reducer;
