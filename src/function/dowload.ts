import { Expense } from "@/app/expenseSlice";
import toExpenseDayList from "./toExpenseListDay";
import { findExpenseGroup } from "./groupExpenseList";
import sum from "./sum";

function downloadXlsx(filename: string, expense: Expense) {
    const { initBalance, wallet, finalBalance, currency, data } = expense
    const expenseDayList = toExpenseDayList(expense)
    const dataExpenseList: string[] = []
    let index = 0
    for (let i = 0; i < expenseDayList.length; i++) {
        const expenseDay = expenseDayList[i]
        expenseDay.expenseList.map((expense) => {
            const group = findExpenseGroup(expense.group)
            const money = group?.type === "income" ? expense.money : - expense.money
            dataExpenseList.push(`${index},${expenseDay.date}/${expenseDay.month}/${expenseDay.year}, ${expense.describe}, ${group?.title}, ${money}`)
            index++
            return dataExpenseList
        })
    }
    const header = "STT,Ngày,Mô tả,Tên nhóm,Số tiền"
    const total = `,,,,` + sum(expenseDayList, 0)

    const dataXlsx = `Tên ví, ${wallet}\nLoại tiền,${currency}\nSố dư đầu,${initBalance}\nSố dư cuối,${finalBalance}\n${header}\n${dataExpenseList.join("\n")}\n${total}`

    const aElement = document.createElement("a");
    aElement.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(dataXlsx),
    );
    aElement.setAttribute("download", filename);
    aElement.style.display = "none";
    document.body.appendChild(aElement);
    aElement.click();
    document.body.removeChild(aElement);
}

export default downloadXlsx;
