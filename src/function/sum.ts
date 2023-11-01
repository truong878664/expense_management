import { ExpenseDay } from "@/app/expenseSlice";

function sum(data: ExpenseDay[], init: number = 0) {
    return Array.from(data).reduce(
        (sum: number, expenseDay) => {
            return sum + expenseDay.total;
        },
        init,
    );
}

export default sum;