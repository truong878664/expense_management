import Money from "@/function/formatMoney";
import classNames from "classnames";
type Statistic = {
  pastTotal: number;
  totalSelect: number;
};
function Statistic({ pastTotal, totalSelect }: Statistic) {
  return (
    <div className="bg-gray-100 p-2">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          <span>Số dư đầu</span>
          <span>Số dư cuối</span>
        </div>
        <div className="flex flex-col items-end gap-1 font-bold">
          <span
            className={classNames({
              "text-red-600": pastTotal < 0,
            })}
          >
            {Money.format(pastTotal)}
          </span>
          <span
            className={classNames("border-b", {
              "text-red-600": pastTotal + totalSelect < 0,
            })}
          >
            {Money.format(pastTotal + totalSelect)}
          </span>
          <span
            className={classNames({
              "text-red-600": totalSelect < 0,
            })}
          >
            {Money.format(totalSelect)}
          </span>
        </div>
      </div>
      <div className="text-center text-green-600">
        <button>Xem báo cáo cho giai đoạn này</button>
      </div>
    </div>
  );
}

export default Statistic;
