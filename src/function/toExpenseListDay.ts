import { Expense, ExpenseDay } from "@/app/expenseSlice";
import copy from "./copy";

// type ExpenseDayWithDate = ExpenseDay & {
//     date: number;
//     month: number;
//     year: number;
// };
// function toExpenseDayList(expenseDate: Expense) {
//     const listExpense: ExpenseDayWithDate[] = [];
//     Object.keys(expenseDate.data).map((year: string) => {
//         const yearList = expenseDate.data[+year];
//         if (!yearList) return;
//         Object.keys(yearList).map((month: string) => {
//             const monthList = yearList[+month];
//             if (!monthList) return;
//             Object.keys(monthList).map((date: string) => {
//                 listExpense.push({
//                     ...copy(monthList[+date]),
//                     date: +date,
//                     month: +month,
//                     year: +year,
//                 });
//                 return listExpense;
//             });
//         });
//     });
//     return listExpense;
// }

type Option = {
    type: "past" | "future";
    date: number;
    month: number;
    year: number;
};

function toExpenseDayList(expense: Expense, option?: Option) {
    const condition = (valueOne: string | number, valueTwo: string | number) => {
        const parseValueOne = Number(valueOne);
        const parseValueTwo = Number(valueTwo);
        return {
            past(hadEqual?: boolean) {
                return !hadEqual
                    ? parseValueOne > parseValueTwo
                    : parseValueOne >= parseValueTwo;
            },
            future(hadEqual?: boolean) {
                return !hadEqual
                    ? parseValueOne < parseValueTwo
                    : parseValueOne <= parseValueTwo;
            },
        };
    };

    const listExpense: ExpenseDay[] = [];
    if (!expense.data) return listExpense;
    Object.keys(expense?.data)?.map((yearM: string) => {
        if (option && condition(yearM, option.year)[option.type]()) return;
        const parseYearM = Number(yearM);
        const yearList = expense.data[parseYearM];
        if (!yearList) return;
        Object.keys(yearList).map((monthM: string) => {
            if (
                option &&
                condition(monthM, option.month)[option.type]() &&
                Number(yearM) === Number(option.year)
            )
                return;
            const parseMonthM = Number(monthM);
            const monthList = yearList[parseMonthM];
            if (!monthList) return;
            Object.keys(monthList).map((dateM: string) => {
                if (
                    option &&
                    condition(dateM, option.date)[option.type](true) &&
                    Number(monthM) === Number(option.month) &&
                    Number(yearM) === Number(option.year)
                )
                    return;
                const parseDateM = Number(dateM);
                if (!monthList[parseDateM]) return;
                listExpense.push({ ...copy(monthList[parseDateM]), date: parseDateM, month: parseMonthM, year: parseYearM });
                return listExpense;
            });
        });
    });
    return listExpense;
}
export default toExpenseDayList;

