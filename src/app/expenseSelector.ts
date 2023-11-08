import { ExpenseList, ExpenseMonth } from "./expenseSlice";
import { Expense } from "@/app/expenseSlice";
import copy from "@/function/copy";
import { findExpenseGroup } from "@/function/groupExpenseList";
import { useSelector } from "react-redux";
type DateReturnMonth = {
    monthList: ExpenseMonth;
    list: ExpenseList[];
    totalAll: number;
};

export type ExpenseSelector = {
    get: () => Expense;
    getMonth: ({
        year,
        month,
    }: {
        year: number;
        month: number;
    }) => undefined | DateReturnMonth;
    toExpenseList: (expenseMonth: ExpenseMonth) => DateReturnMonth;
    total: (expenseList: ExpenseList[]) => number

};

function expenseSelector(): ExpenseSelector {
    const expense = useSelector(
        (state: { createSlice: Expense }) => state.createSlice,
    );
    return {
        get() {
            return expense;
        },
        getMonth({ month, year }) {
            const data = (expense.data ||= {});
            const yearData = data[year] || {};
            const monthData = yearData[month];
            return Boolean(monthData) !== false
                ? this.toExpenseList(monthData)
                : undefined;
        },
        toExpenseList(expenseMonth) {
            return {
                monthList: expenseMonth,
                list: Object.keys(expenseMonth).reduce(
                    (expenseListResult: ExpenseList[], month) => {
                        const parseMonth = Number(month);
                        const { expenseList } = expenseMonth[parseMonth];
                        return expenseListResult.concat(
                            copy(expenseList).filter((expense: ExpenseList) => {
                                const group = findExpenseGroup(expense.group);
                                return group?.type === "expense";
                            }),
                        );
                    },
                    [],
                ),
                totalAll: Object.keys(expenseMonth).reduce((result, month) => {
                    const parseMonth = Number(month);
                    return result + expenseMonth[parseMonth].total;
                }, 0),
            }
        },
        total(expenseList) {
            return expenseList.reduce((total, expense) => {
                return total + expense.money
            }, 0)
        }
    };
}

export default expenseSelector;
