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
export type ExpenseMonth = {
    [date: number]: ExpenseDay;
};
export type ExpenseDay = {
    total: number;
    expenseList: ExpenseList[];
    date: number;
    month: number;
    year: number;
    day: string;
};
export type ExpenseList = {
    id: string | number;
    group: number | string;
    describe?: string;
    money: number;
    date: number;
    month: number;
    year: number;
    day: string;
    timestamp: number;
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
export type ExpensePayload = ExpenseList;
export type DeleteExpensePayload = {
    date: number;
    month: number;
    year: number;
    id: number | string;
};

const sumExpenseDay = (data: ExpenseList[]): number => {
    const totalMoney = Array.from(data).reduce(
        (sum: number, expense: ExpenseList) => {
            const group = findExpenseGroup(expense.group);
            if (group?.type === "income") {
                return sum + expense.money;
            } else {
                return sum - expense.money;
            }
        },
        0,
    );
    return totalMoney;
};

const dataExpense = new DataExpense();
const initialState: Expense = dataExpense.get;
const actions = {
    add(state: Expense, action: PayloadAction<ExpensePayload>): void {
        const { ...expenseItem } = action.payload;
        const { date, month, year, day } = expenseItem;
        const data = (state.data ||= {});
        const yearData = (data[year] ||= {});
        const monthData = (yearData[month] ||= {});
        const dayData: ExpenseDay = (monthData[date] ||= {
            total: 0,
            expenseList: [],
            date,
            month,
            year,
            day,
        });

        dayData.expenseList = [...copy(dayData.expenseList), expenseItem];

        dayData.total = sumExpenseDay(dayData.expenseList);

        if (state.data) {
            const listExpense = toExpenseDayList(state);
            const total = sum(listExpense, state.initBalance);
            state.finalBalance = total;
        }
        dataExpense.save(JSON.stringify(state));
    },
    deleteExpense(
        state: Expense,
        action: PayloadAction<DeleteExpensePayload>,
    ): void {
        const { year, date, month, id } = action.payload;
        const dayData = state.data[year][month][date];
        const data = dayData.expenseList;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data.splice(i, 1);
                break;
            }
        }
        dayData.total = sumExpenseDay(dayData.expenseList);
        const listExpense = toExpenseDayList(state);
        const total = sum(listExpense, state.initBalance);
        state.finalBalance = total;
        dataExpense.save(JSON.stringify(state));
    },
};

const expenseSlice = createSlice({
    name: "createExpense",
    initialState,
    reducers: actions,
});

export const { add, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
