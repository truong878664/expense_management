import CDate from "./CDate";

function createDateList() {
    const LENGTH_DATE_SHOW = 20;
    const today = new Date()
    const otherDate = new Date()
    const todayValue = today.toLocaleDateString('en-GB')
    otherDate.setDate(otherDate.getDate() - 1)
    const yesterdayValue = otherDate.toLocaleDateString('en-GB')
    const dateList: { value: string, title: string }[] = [{ value: "future", title: "Tương lai" }];
    today.setDate((today.getDate()) + 1);
    for (let i = 1; i < LENGTH_DATE_SHOW; i++) {
        today.setDate((today.getDate()) - 1);
        const isToday = todayValue === today.toLocaleDateString('en-GB')
        const isYesterday = yesterdayValue === today.toLocaleDateString('en-GB')

        const title = isToday ? "Hôm nay" : isYesterday ? "Hôm qua" : today.toLocaleDateString('en-GB')
        dateList.unshift({
            value: today.toLocaleDateString('en-GB'),
            title
        })
    }
    return dateList;
}

export default createDateList();
