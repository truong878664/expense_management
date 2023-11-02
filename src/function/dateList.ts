function createDateList() {
    const optionFormatTime = [process.env.LOCAL_CODE, process.env.TIME_ZONE as any]
    const LENGTH_DATE_SHOW = 20;
    const today = new Date()
    const otherDate = new Date()
    const todayValue = today.toLocaleDateString(...optionFormatTime)
    otherDate.setDate(otherDate.getDate() - 1)
    const yesterdayValue = otherDate.toLocaleDateString(...optionFormatTime)
    const dateList: { value: string, title: string }[] = [{ value: "future", title: "Tương lai" }];
    today.setDate((today.getDate()) + 1);
    for (let i = 1; i < LENGTH_DATE_SHOW; i++) {
        today.setDate((today.getDate()) - 1);
        const isToday = todayValue === today.toLocaleDateString(...optionFormatTime)
        const isYesterday = yesterdayValue === today.toLocaleDateString(...optionFormatTime)

        const title = isToday ? "Hôm nay" : isYesterday ? "Hôm qua" : today.toLocaleDateString(...optionFormatTime)
        dateList.unshift({
            value: today.toLocaleDateString(...optionFormatTime),
            title
        })
    }
    return dateList;
}

export default createDateList();
