const Money = {
    format(money: number | string) {
        const value = Number(money);
        if (isNaN(value)) return 0;
        return value.toLocaleString(
            "vi-VN",
            {
                style: "currency",
                currency: "VND",
            },
        )
    },
    formatNumber(money: string | number) {
        const value = Number(`${money}`.replaceAll(/[^0-9]/g, ""))
        return new Intl.NumberFormat().format(value)
    }
};

export default Money;
