import iconList from "./Icon";
export type TypeExpense = "income" | "expense"

export const groupExpenseList = [
    {
        group: "Chi tiêu hàng tháng",
        data: ["gr_99452bf339014", "gr_2212cfd08bfda", "gr_a2a1be33ec0f6", "gr_b9ccd4fasdcb4"],
    },
    {
        group: "Chi tiêu cần thiết",
        data: ["gr_51de9ba2db546", "gr_c83cec7687609", "gr_028f7936da844"],
    },
    {
        group: "Khoản thu",
        data: ["gr_43656b13ad361", "gr_13e5b6a41f08c"],
    },
    {
        group: "Đầu tư, Cho vay & Nợ",
        data: ["gr_126d6085db2ae", "gr_d6ef13aecf8a9", "gr_b9ccf4fa9dcb4"],
    },
];


export const expenseList: {
    id: string,
    title: string,
    icon: string,
    color: string,
    type: TypeExpense
}[] = [
        {
            id: "gr_99452bf339014",
            title: "Ăn uống",
            icon: "icon_9cc826a1cbb34",
            color: "#1F4172",
            type: "expense"
        },
        {
            id: "gr_2212cfd08bfda",
            title: "Di chuyển",
            icon: "icon_1224a12d6beb2",
            color: "#1AACAC",
            type: "expense"

        },
        {
            id: "gr_a2a1be33ec0f6",
            title: "Thuê nhà",
            icon: "icon_ffe9c8be4468f",
            color: "#F55050",
            type: "expense"

        },
        {
            id: "gr_b9ccd4fasdcb4",
            title: "Vui chơi",
            icon: "icon_a86a8bd5bd74g",
            color: "#FF9209",
            type: "expense"
        },
        {
            id: "gr_51de9ba2db546",
            title: "Bảo dưỡng xe",
            icon: "icon_1224a12d6beb3",
            color: "#E55604",
            type: "expense"

        },
        {
            id: "gr_c83cec7687609",
            title: "Bảo hiểm",
            icon: "icon_1224a12d6beb4",
            color: "#C70039",
            type: "expense"

        },
        {
            id: "gr_028f7936da844",
            title: "Giáo dục",
            icon: "icon_1224a12d6beb5",
            color: "#2E4374",
            type: "expense"

        },
        {
            id: "gr_43656b13ad361",
            title: "Lương",
            icon: "icon_1224a12d6beb6",
            color: "#82CD47",
            type: "income"
        },
        {
            id: "gr_13e5b6a41f08c",
            title: "Thu nhập khác",
            icon: "icon_1224a12d6beb7",
            color: "#884A39",
            type: "income"
        },
        {
            id: "gr_126d6085db2ae",
            title: "Đầu tư",
            icon: "icon_1224a12d6beb8",
            color: "#451952",
            type: "expense"
        },
        {
            id: "gr_d6ef13aecf8a9",
            title: "Cho vay",
            icon: "icon_1224a12d6beb1",
            color: "#9400FF",
            type: "expense"
        },
        {
            id: "gr_b9ccf4fa9dcb4",
            title: "Đi vay",
            icon: "icon_1224a12d6beb9",
            color: "#C70039",
            type: "income"
        },

    ];

export const findExpenseGroup = (id: string | number) => {
    const expenseFind = expenseList.find(item => item.id === id)
    if (expenseFind) {
        const iconFind = iconList.find(icon => icon.id === expenseFind.icon)
        return { ...expenseFind, iconFa: iconFind }
    }
}