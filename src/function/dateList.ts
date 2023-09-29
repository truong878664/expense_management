function createDateList() {
    const LENGTH_DATE_SHOW = 20;
    const today = new Date()
    const otherDate = new Date()
    const todayValue = today.toLocaleDateString()
    otherDate.setDate(otherDate.getDate() - 1)
    const yesterdayValue = otherDate.toLocaleDateString()
    const dateList: { value: string, title: string }[] = [{ value: "future", title: "Tương lai" }];
    today.setDate((today.getDate()) + 1);
    for (let i = 1; i < LENGTH_DATE_SHOW; i++) {
        today.setDate((today.getDate()) - 1);
        const isToday = todayValue === today.toLocaleDateString()
        const isYesterday = yesterdayValue === today.toLocaleDateString()

        const title = isToday ? "Hôm nay" : isYesterday ? "Hôm qua" : today.toLocaleDateString()
        dateList.unshift({
            value: today.toLocaleDateString(),
            title
        })
    }
    return dateList;
}

export default createDateList();
