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
    getPeriod: ({ begin, end }: { begin: Date; end: Date }) => undefined | ExpenseList[];
    toExpenseListAll: () => ExpenseList[]
};

function useExpenseSelector(): UseExpenseSelector {
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
        getWeek({ begin, end }) {
            return undefined;
        },
        getPeriod({ begin, end }) {
            const expenseListAll = this.toExpenseListAll()
            return copy(expenseListAll).filter((expense: ExpenseList) => {
                return expense.timestamp >= begin.timeStamp && expense.timestamp <= end.timeStamp
            })
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
            const expenseList: ExpenseList[] = []
            Object.keys(expense.data)?.map((yearM) => {
                const parseYear = Number(yearM)
                const dataYear = expense.data[parseYear]
                Object.keys(dataYear).map(monthM => {
                    const parseMonth = Number(monthM)
                    const dataMonth = dataYear[parseMonth]
                    expenseList.push(...this.toExpenseList(dataMonth).list)
                    return expenseList
                })
                return expenseList
            })
            return expenseList
        }


        // getPeriod({ begin, end }) {
        //     const { date: dateBegin, month: monthBegin, year: yearBegin } = begin;
        //     const { date: dateEnd, month: monthEnd, year: yearEnd } = end;

        //     const listExpense: ExpenseDay[] = [];
        //     // if (!expense.data) return listExpense;
        //     Object.keys(expense?.data)?.map((yearM: string) => {
        //         const parseYearM = Number(yearM);
        //         if ((parseYearM >= yearBegin && parseYearM <= yearEnd) === false) return
        //         const yearList = expense.data[parseYearM];
        //         if (!yearList) return;
        //         Object.keys(yearList).map((monthM: string) => {
        //             const parseMonthM = Number(monthM)
        //             if ((parseMonthM >= monthBegin && parseYearM <= yearEnd) === false) return

        //         })


        //         // if (option && condition(yearM, option.year)[option.type]()) return;
        //         // const parseYearM = Number(yearM);
        //         // const yearList = expense.data[parseYearM];
        //         // if (!yearList) return;
        //         // Object.keys(yearList).map((monthM: string) => {
        //         //     if (
        //         //         option &&
        //         //         condition(monthM, option.month)[option.type]() &&
        //         //         Number(yearM) === Number(option.year)
        //         //     )
        //         //         return;
        //         //     const parseMonthM = Number(monthM);
        //         //     const monthList = yearList[parseMonthM];
        //         //     if (!monthList) return;
        //         //     Object.keys(monthList).map((dateM: string) => {
        //         //         if (
        //         //             option &&
        //         //             condition(dateM, option.date)[option.type](true) &&
        //         //             Number(monthM) === Number(option.month) &&
        //         //             Number(yearM) === Number(option.year)
        //         //         )
        //         //             return;
        //         //         const parseDateM = Number(dateM);
        //         //         if (!monthList[parseDateM]) return;
        //         //         listExpense.push({ ...copy(monthList[parseDateM]), date: parseDateM, month: parseMonthM, year: parseYearM });
        //         //         return listExpense;
        //         //     });
        //         // });
        //     });
        //     return listExpense;
        // },
    };
}

export default useExpenseSelector;
