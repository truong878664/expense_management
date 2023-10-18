import { ExpenseData } from "@/app/expenseSlice";

export default class DataExpense {
    #data: ExpenseData;
    constructor() {
        const isClient = typeof window !== 'undefined'
        const storage = isClient && localStorage.getItem('expense')
        if (!storage && isClient) localStorage.setItem('expense', JSON.stringify([]))
        const init = {
            initBalance: 0,
            finalBalance: 0,
            currency: "vnd" as const,
            wallet: "Tien mat",
            idWallet: "tienmat",
            data: {}
        }
        const data = storage ? JSON.parse(storage) : init
        this.#data = data
        this.save()

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
    set set(data: ExpenseData) {

    }
    save() {
        console.log("data---", this.#data);

        localStorage.setItem('expense', "[123]")
    }
}
