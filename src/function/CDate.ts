export default class CustomDate {
    #date;
    constructor() {
        this.#date = new Date();
    }
    get today() {
        return this.#date.toLocaleDateString();
    }
    get year() {
        return this.#date.getFullYear();
    }
    get month() {
        return this.#date.getMonth();
    }
    get hours() {
        return this.#date.getHours();
    }
    get minute() {
        return this.#date.getMinutes();
    }
    get full() {
        return {
            year: this.year,
            month: this.month,
            hours: this.hours,
            minute: this.minute,
        };
    }
}
