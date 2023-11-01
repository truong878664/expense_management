import { Expense, ExpenseDay } from "@/app/expenseSlice"
import copy from "./copy"

type ExpenseDayWithDate = ExpenseDay & { date: number, month: number, year: number }
function toExpenseDayList(expenseDate: Expense) {
    const listExpense: ExpenseDayWithDate[] = []
    Object.keys(expenseDate.data).map((year: string) => {
        const yearList = expenseDate.data[+year]
        if (!yearList) return
        Object.keys(yearList).map((month: string) => {
            const monthList = yearList[+month]
            if (!monthList) return
            Object.keys(monthList).map((date: string) => {
                listExpense.push({ ...copy(monthList[+date]), date: +date, month: +month, year: +year })
                return listExpense
            })
        })

    })
    return listExpense
}

export default toExpenseDayList;