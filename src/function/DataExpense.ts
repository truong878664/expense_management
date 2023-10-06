export default class DataExpense {
    #data;
    constructor() {
        const isClient = typeof window !== 'undefined'
        const storage = isClient && localStorage.getItem('expense')
        if (!storage && isClient) localStorage.setItem('expense', JSON.stringify([]))
        this.#data = JSON.parse(storage || "[]")
    }
    get get() {
        return this.#data
    }
}