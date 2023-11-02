import DataExpense from "@/function/DataExpense";
import copy from "@/function/copy";
import { findExpenseGroup } from "@/function/groupExpenseList";
import sum from "@/function/sum";
import toExpenseDayList from "@/function/toExpenseListDay";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ExpenseData = {
    [year: number]: ExpenseYear;
};
type ExpenseYear = {
    [month: number]: ExpenseMonth;
};
type ExpenseMonth = {
    [date: number]: ExpenseDay;
};
export type ExpenseDay = {
    total: number;
    expenseList: ExpenseList[];
};
export type ExpenseList = {
    id: string | number | null;
    group: number | string;
    describe?: string;
    money: number;
};
export type Expense = {
    initBalance: number;
    finalBalance: number;
    currency: "vnd" | "usd";
    wallet: string;
    idWallet: string | number;
    finalBalanceEachYear: { [year: number]: number };
    data: ExpenseData;
};
export type ExpensePayload = ExpenseList & {
    date: number;
    month: number;
    year: number;
};
const dataExpense = new DataExpense();
const initialState: Expense = dataExpense.get;
const actions = {
    add(state: Expense, action: PayloadAction<ExpensePayload>) {
        const { date, month, year, ...expenseItem } = action.payload;
        const data = (state.data ||= {});
        const yearData = (data[year] ||= {});
        const monthData = (yearData[month] ||= {});
        const dayData: ExpenseDay = (monthData[date] ||= {
            total: 0,
            expenseList: [],
        });

        dayData.expenseList = [
            ...copy(dayData.expenseList),
            expenseItem,
        ];

        const totalMoney = Array.from(dayData.expenseList).reduce(
            (sum: number, expense: ExpenseList) => {
                const group = findExpenseGroup(expense.group)
                if (group?.type === "income") {
                    return sum + expense.money
                } else {
                    return sum - expense.money
                }
            },
            0,
        );

        dayData.total = totalMoney

        if (state.data) {
            const listExpense = toExpenseDayList(state)
            const total = sum(listExpense, state.initBalance)
            state.finalBalance = total
        }
        dataExpense.save((JSON.stringify(state)))
    },
};
const expenseSlice = createSlice({
    name: "createExpense",
    initialState,
    reducers: actions,
});

export const { add } = expenseSlice.actions;
export default expenseSlice.reducer;