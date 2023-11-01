import { Expense } from "@/app/expenseSlice";

export default class DataExpense {
    #data: Expense;
    constructor() {
        const isClient = typeof window !== 'undefined'
        const storage = isClient && localStorage.getItem('expense')
        const init = {
            initBalance: 0,
            finalBalance: 0,
            currency: "vnd",
            wallet: "Tiền mặt",
            idWallet: "tienmat",
            data: {}
        }
        if (!storage && isClient) localStorage.setItem('expense', JSON.stringify(init))

        const data = storage ? JSON.parse(storage) : init
        console.log("Data expense init", data);
        this.#data = data
    }
    get get() {
        return this.#data
    }
    set set(data: Expense) {

    }
    save(data: string) {
        console.log("Save data to localStorage");
        localStorage.setItem('expense', data)
    }
}
