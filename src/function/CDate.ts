export default class CDate {

    #date;
    constructor() {
        this.#date = new Date();
    }
    get today() {
        return this.#date.toLocaleDateString(process.env.LOCAL_CODE, process.env.TIME_ZONE as any);
    }
    get year() {
        return this.#date.getFullYear();
    }
    get month() {
        return this.#date.getMonth() + 1;
    }
    get date() {
        return this.#date.getDate();
    }
    get day() {
        const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
        return days[this.#date.getDay()]
    }
    get hours() {
        return this.#date.getHours();
    }
    get minute() {
        return this.#date.getMinutes();
    }
    get second() {
        return this.#date.getSeconds()
    }

    calculateDay(date: number) {
        this.#date.setDate(this.#date.getDate() + date);
        return this.full
    }
    setTime({ date, month, year }: { date: number | string, month: number | string, year: number | string }) {
        const parseDate = Number(date)
        const parseMonth = Number(month)
        const parseYear = Number(year)
        !isNaN(parseDate) && this.#date.setDate(parseDate);
        !isNaN(parseMonth) && this.#date.setMonth(parseMonth - 1);
        !isNaN(parseYear) && this.#date.setFullYear(parseYear);
        return this.full
    }

    get full() {
        return {
            year: this.year,
            month: this.month,
            date: this.date,
            hours: this.hours,
            minute: this.minute,
            day: this.day
        };
    }
}
