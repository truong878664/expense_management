import Money from "@/function/formatMoney";
import classNames from "classnames";

type HeaderListExpense = {
  date: number;
  month: number;
  year: number;
  totalDay?: number;
  day: string;
};
function HeaderListExpense({
  date,
  month,
  year,
  totalDay,
  day,
}: HeaderListExpense) {
  const totalSelect = totalDay || 0;
  if (!(date || month || year || day)) return <></>;
  return (
    <div className="sticky top-0 z-1 flex items-center justify-between bg-gray-100 p-2 shadow shadow-gray-100">
      <div className="flex">
        <span className="mr-2 min-w-[44px] text-center text-4xl font-bold text-sky-700">
          {date}
        </span>
        <div className="flex flex-col justify-center text-sm leading-tight">
          <span>{day}</span>
          <span>
            tháng {month} năm {year}
          </span>
        </div>
      </div>
      <span
        className={classNames("text-lg font-bold", {
          "text-red-600": totalSelect < 0,
          "text-green-600": totalSelect > 0,
          "sr-only": totalSelect === 0,
        })}
      >
        {Money.format(totalSelect)}
      </span>
    </div>
  );
}

export default HeaderListExpense;
