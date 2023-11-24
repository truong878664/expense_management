import { Date } from "@/function/CDate";
import { ExpenseDay, ExpenseList, ExpenseMonth } from "./expenseSlice";
import { Expense } from "@/app/expenseSlice";
import copy from "@/function/copy";
import { TypeExpense, findExpenseGroup } from "@/function/groupExpenseList";
import { useSelector } from "react-redux";

type DateReturnMonth = {
    monthList?: ExpenseMonth;
    list: ExpenseList[];
    totalAll: number;
};

export type UseExpenseSelector = {
    get: () => Expense;
    getById: (id: string | number) => ExpenseList | undefined;
    getMonth: ({
        year,
        month,
    }: {
        year: number;
        month: number;
    }) => undefined | DateReturnMonth;
    getWeek: ({
        begin,
        end,
    }: {
        begin: Date;
        end: Date;
    }) => undefined | DateReturnMonth;
    toExpenseList: (expenseMonth: ExpenseMonth) => DateReturnMonth;
    total: (expenseList: ExpenseList[]) => number;
    getPeriod: ({
        begin,
        end,
    }: {
        begin: Date;
        end: Date;
    }) => undefined | ExpenseList[];
    toExpenseListAll: () => ExpenseList[] | undefined;
    toAllDataList: () => ExpenseList[] | undefined;
};

function useExpenseSelector(): UseExpenseSelector {
    const expense = useSelector(
        (state: { createSlice: Expense }) => state.createSlice,
    );
    return {
        get() {
            return expense;
        },
        getById(id) {
            const listExpenseAll = this.toAllDataList()
            return listExpenseAll?.find(expense => expense.id === id)
        },
        getMonth({ month, year }) {
            const data = (expense.data ||= {});
            const yearData = data[year] || {};
            const monthData = yearData[month];
            return Boolean(monthData) !== false
                ? this.toExpenseList(monthData)
                : undefined;
        },
        getWeek({ begin, end }) {
            return undefined;
        },
        getPeriod({ begin, end }) {
            const expenseListAll = this.toExpenseListAll();
            return copy(expenseListAll).filter((expense: ExpenseList) => {
                return (
                    expense.timestamp >= begin.timeStamp &&
                    expense.timestamp <= end.timeStamp
                );
            });
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
            };
        },
        total(expenseList) {
            return expenseList.reduce((total, expense) => {
                return total + expense.money;
            }, 0);
        },
        toExpenseListAll() {
            const expenseList: ExpenseList[] = [];
            Object.keys(expense.data)?.map((yearM) => {
                const parseYear = Number(yearM);
                const dataYear = expense.data[parseYear];
                Object.keys(dataYear).map((monthM) => {
                    const parseMonth = Number(monthM);
                    const dataMonth = dataYear[parseMonth];
                    expenseList.push(...this.toExpenseList(dataMonth).list);
                    return expenseList;
                });
                return expenseList;
            });
            return expenseList;
        },
        toAllDataList() {
            const expenseList: ExpenseList[] = [];
            for (const yearM of Object.keys(expense.data)) {
                const parseYear = Number(yearM);
                const dataYear = expense.data[parseYear];
                for (const monthM of Object.keys(dataYear)) {
                    const parseMonth = Number(monthM);
                    const dataMonth = dataYear[parseMonth];
                    for (const dateM of Object.keys(dataMonth)) {
                        const parseDate = Number(dateM);
                        expenseList.push(...dataMonth[parseDate].expenseList);
                    }
                }
            }
            return expenseList;
        }
    };
}

export default useExpenseSelector;
