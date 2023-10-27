import { Expense } from "@/app/expenseSlice";

export default class DataExpense {
    #data: Expense;
    constructor() {
        const isClient = typeof window !== 'undefined'
        const storage = isClient && localStorage.getItem('expense')
        if (!storage && isClient) localStorage.setItem('expense', JSON.stringify({}))
        const init = {
            initBalance: 0,
            finalBalance: 0,
            currency: "vnd",
            wallet: "Tien mat",
            idWallet: "tienmat",
            data: {}
        }

        const data = storage ? JSON.parse(storage) : init
        console.log("Data expense init", data);
        this.#data = data
    }
    get get() {
        return this.#data
    }
    set set(data: Expense) {

    }
    save(data: any) {
        localStorage.setItem('expense', data)
    }
}
