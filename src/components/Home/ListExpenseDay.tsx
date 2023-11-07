import { ExpenseDay, ExpenseList } from "@/app/expenseSlice";
import HeaderListExpense from "./HeaderListExpense";
import { findExpenseGroup } from "@/function/groupExpenseList";
import ItemExpense from "../expense/ItemExpense";
import shortHandString from "@/function/shortHandString";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import EmptyBox from "./EmptyBox";
import classNames from "classnames";

type ListExpenseDay = {
  date: number;
  month: number;
  year: number;
  day: string;
  totalDay?: number;
  expenseDay?: ExpenseList[];
};
function ListExpenseDay({
  date,
  month,
  year,
  day,
  totalDay,
  expenseDay,
}: ListExpenseDay) {
  return (
    <div className={classNames({ "flex-1": !expenseDay }, "flex flex-col")}>
      <HeaderListExpense
        date={date}
        month={month}
        year={year}
        totalDay={totalDay}
        day={day}
      />
      {expenseDay ? (
        <ul className="flex flex-col gap-5 bg-gray-100 px-2 py-4">
          {expenseDay.map((item, index: number) => {
            const group = findExpenseGroup(item.group);
            return (
              <ItemExpense
                key={index}
                type={group?.type || "expense"}
                kind={group?.title || "Không có tiêu đề"}
                describe={shortHandString(item.describe)}
                value={item.money}
                icon={group?.iconFa?.icon || faPaw}
                color={(group?.color as `#${string}`) || "#F875AA"}
              />
            );
          })}
        </ul>
      ) : (
        <EmptyBox dependency={date} />
      )}
    </div>
  );
}

export default ListExpenseDay;
