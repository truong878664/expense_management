import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/test/counterSlice";
import createExpenseReducer from "@/app/@modal/(.)add-expense/createExpenseSlice";
import expenseSlice from "./app/expenseSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        createExpense: createExpenseReducer,
        createSlice: expenseSlice
    },
});
