import { timeStamp } from 'console';

export type Date = {
    year: number
    month: number
    date: number
    timeStamp: number
    hours?: number
    minute?: number
    day?: string
}

export default class CDate {
    #date;
    constructor() {
        this.#date = new Date();
        this.#date.setSeconds(0)
        this.#date.setHours(0)
        this.#date.setMinutes(0)
        this.#date.setMilliseconds(0)
    }
    get timestamp() {
        return this.#date.getTime()
    }
    get today() {
        return this.#date.toLocaleDateString(
            process.env.LOCAL_CODE,
            process.env.TIME_ZONE as any,
        );
    }
    get year() {
        return this.#date.getFullYear();
    }
    get month() {
        return this.#date.getMonth() + 1;
    }
    get dateWeek() {
        let dayOfWeek = this.#date.getDay();
        const currentDate = this.date;
        dayOfWeek === 0 ? dayOfWeek = 6 : dayOfWeek -= 1
        const objectDate = new CDate();
        const begin = objectDate.setTime({
            date: currentDate - dayOfWeek,
        });
        const end = objectDate.setTime({ date: objectDate.date + 6 });
        return { begin, end };
    }
    get dateLastWeek() {
        const newCDate = new CDate()
        newCDate.setTime({ date: this.date - 6 })
        return newCDate.dateWeek;
    }
    get dateMonth() {
        const begin = new CDate().setTime({ date: 1, month: this.month, year: this.year })
        const end = new CDate().setTime({ date: 0, month: this.month + 1, year: this.year })
        return { begin, end }
    }
    get dateLastMonth() {
        const begin = new CDate().setTime({ date: 1, month: this.month - 1, year: this.year })
        const end = new CDate().setTime({ date: 0, month: this.month - 1, year: this.year })
        return { begin, end }
    }

    get date() {
        return this.#date.getDate();
    }
    get day() {
        const days = [
            "Chủ Nhật",
            "Thứ Hai",
            "Thứ Ba",
            "Thứ Tư",
            "Thứ Năm",
            "Thứ Sáu",
            "Thứ Bảy",
        ];
        return days[this.#date.getDay()];
    }
    get hours() {
        return this.#date.getHours();
    }
    get minute() {
        return this.#date.getMinutes();
    }
    get second() {
        return this.#date.getSeconds();
    }

    calculateDay(date: number) {
        this.#date.setDate(this.#date.getDate() + date);
        return this.full;
    }
    setTime({
        date,
        month,
        year,
    }: {
        date?: number | string;
        month?: number | string;
        year?: number | string;
    }) {
        const parseDate = Number(date);
        const parseMonth = Number(month);
        const parseYear = Number(year);
        !isNaN(parseDate) && this.#date.setDate(parseDate);
        !isNaN(parseMonth) && this.#date.setMonth(parseMonth - 1);
        !isNaN(parseYear) && this.#date.setFullYear(parseYear);
        return { ...this.full, dayWeek: this.#date.getDay() };
    }

    get full(): Date {
        return {
            year: this.year,
            month: this.month,
            date: this.date,
            hours: this.hours,
            minute: this.minute,
            day: this.day,
            timeStamp: this.timestamp,
        };
    }
}
