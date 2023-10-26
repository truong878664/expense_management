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
        console.log("locak", data);
        this.#data = data
        // console.log("storate_____", JSON.parse(storage || localStorage.getItem('expense')))
        // console.log(localStorage.getItem('expense'));


        // this.#data = JSON.parse(storage || `
        // {
        //     initBalance: 0;
        //     finalBalance: 0;
        //     currency: "vnd";
        //     wallet: "Tien mat";
        //     idWallet: "tienmat";
        //     data: {};
        // }`)
        // this.#data = {
        //     initBalance: 0,
        //     finalBalance: 0,
        //     currency: "vnd" as const,
        //     wallet: "Tien mat",
        //     idWallet: "tienmat",
        //     data: {
        //         2023: {
        //             10: {}
        //         }
        //     },
        // }
    }
    get get() {
        return this.#data
    }
    set set(data: Expense) {

    }
    save(data: any) {
        // console.log("data---", this.#data);
        localStorage.setItem('expense', data)
    }
}
