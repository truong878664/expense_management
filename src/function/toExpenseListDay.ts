import { Expense, ExpenseDay } from "@/app/expenseSlice";
import copy from "./copy";

type ExpenseDayWithDate = ExpenseDay & {
    date: number;
    month: number;
    year: number;
};
function toExpenseDayList(expenseDate: Expense) {
    const listExpense: ExpenseDayWithDate[] = [];
    Object.keys(expenseDate.data).map((year: string) => {
        const yearList = expenseDate.data[+year];
        if (!yearList) return;
        Object.keys(yearList).map((month: string) => {
            const monthList = yearList[+month];
            if (!monthList) return;
            Object.keys(monthList).map((date: string) => {
                listExpense.push({
                    ...copy(monthList[+date]),
                    date: +date,
                    month: +month,
                    year: +year,
                });
                return listExpense;
            });
        });
    });
    return listExpense;
}

export default toExpenseDayList;
type Option = {
    type: "past" | "future";
    date: number;
    month: number;
    year: number;
};

function to(expense: Expense, option?: Option) {
    const condition = (numOne: string | number, numTwo: string | number) => {
        return {
            past() {
                return Number(numOne) > Number(numTwo)
            },
            future() {
                return Number(numOne) < Number(numTwo)
            }
        }
    }


    const listExpense: ExpenseDay[] = [];
    if (!expense.data) return listExpense;
    Object.keys(expense?.data)?.map((yearM: string) => {

        if (option && condition(yearM, option.year)[option.type]()) return;
        const yearList = expense.data[+yearM];
        if (!yearList) return;
        Object.keys(yearList).map((monthM: string) => {
            if (option && condition(monthM, option.month)[option.type]() && Number(yearM) === Number(option.year)) return;
            const monthList = yearList[+monthM];
            if (!monthList) return;
            Object.keys(monthList).map((dateM: string) => {
                if (option && condition(dateM, option.date)[option.type]() && Number(monthM) === Number(option.month) && Number(yearM) === Number(option.year)) return;
                if (!monthList[+dateM]) return;
                listExpense.push(copy(monthList[+dateM]));
                return listExpense;
            });
        });
    });
    return listExpense;
}
export { to };
