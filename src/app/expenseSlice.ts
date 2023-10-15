import DataExpense from "@/function/DataExpense";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ExpenseList {
    id: string | number | null;
    group: number | string;
    describe?: string;
    money: number;
    type: "income" | "expense";
}
interface expenseDay {
    [day: number]: {
        initBalanceDay: number;
        finalBalanceDay: number;
        expenseList?: ExpenseList[] | [];
    };
}
interface expenseMonth {
    [month: number]: expenseDay | {};
}
interface expenseYear {
    [year: number]: expenseMonth | {};
}
interface InitialState {
    initBalance: number;
    finalBalance: number;
    currency: "vnd" | "usd";
    wallet: string;
    idWallet: string | number;
    finalBalanceEachYear: { [year: number]: number };
    data: expenseYear | {};
}
interface PayloadExpense extends ExpenseList {
    day: number;
    month: number;
    year: number;
}

const dataExpense = new DataExpense();

const initialState: InitialState = dataExpense.get;
const actions = {
    add(state: InitialState, action: PayloadAction<PayloadExpense>) {
        console.log("current state", state);
        console.log("payload", action.payload);
        const { day, month, year, ...rest } = action.payload;
        // console.log(Object.hasOwn(state, year));
        // state.data ? [year] ? [month] ? [day]?.expenseList

        const addKeyObject = (object: { [key: string | number]: any }, key: string | number, value: any) => {
            if (Object.hasOwn(object, key)) {
                object[key] = value;
            } else {

            }
        }

        // console.log("state", state.data[year]);
        // } else {
        //     // state.data[year] = {};
        // }

        // console.log(action.payload);
    },
};
const expenseSlice = createSlice({
    name: "createExpense",
    initialState,
    reducers: actions,
});

export const { add } = expenseSlice.actions;
export default expenseSlice.reducer;
