import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/test/counterSlice";
import createExpenseReducer from "@/app/@modal/(.)add-expense/createExpenseSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        createExpense: createExpenseReducer,
    },
});
