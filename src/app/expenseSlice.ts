import DataExpense from "@/function/DataExpense";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface ExpenseList {
    id: string | number | null;
    group: number | string;
    describe?: string;
    money: number;
    type: "income" | "expense";
    day: string;
}
interface expenseDay {
    [date: number]: {
        total: number;
        expenseList?: ExpenseList[];
    };
}
interface expenseMonth {
    [month: number]: expenseDay;
}
interface expenseYear {
    [year: number]: expenseMonth;
}
export interface ExpenseData {
    initBalance: number;
    finalBalance: number;
    currency: "vnd" | "usd";
    wallet: string;
    idWallet: string | number;
    data: expenseYear;
}

export interface ExpensePayload extends ExpenseList {
    date: number;
    month: number;
    year: number;
}

const dataExpense = new DataExpense();

const initialState: ExpenseData = dataExpense.get;
const actions = {
    add(state: ExpenseData, action: PayloadAction<ExpensePayload>) {
        const { date, month, year, ...expenseItem } = action.payload;
        const yearData = (state.data[year] ||= {});
        const monthData = (yearData[month] ||= {});
        const dayData = (monthData[date] ||= {
            total: 0,
            expenseList: [],
        });
        dayData.expenseList = [...<[]>dayData.expenseList, expenseItem]
        // dataExpense.save(JSON.parse(JSON.stringify(state)))
        console.log(JSON.parse(JSON.stringify(state)));

    },
};
const expenseSlice = createSlice({
    name: "createExpense",
    initialState,
    reducers: actions,
});

export const { add } = expenseSlice.actions;
export default expenseSlice.reducer;
