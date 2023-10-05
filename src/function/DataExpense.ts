export default class DataExpense {
    #data;
    constructor() {
        const storage = localStorage.getItem('expense')
        if (!storage) localStorage.setItem('expense', JSON.stringify([]))
        this.#data = JSON.parse(storage || "[]")
    }
    get get() {
        return this.#data
    }
}