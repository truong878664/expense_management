import Money from "@/function/formatMoney";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

function ItemExpense({
  type = "expense",
  kind,
  describe,
  value,
  icon,
  color,
}: {
  type: "income" | "expense";
  kind: string;
  describe: string;
  value: number | string;
  icon: IconProp;
  color: `#${string}`;
}) {
  const isPercent = value.toString().indexOf("%") !== -1;

  return (
    <li className="flex items-center justify-between">
      <div className="flex">
        <div
          style={{ backgroundColor: color }}
          className="mr-2 grid h-10 w-10 place-content-center rounded-full text-xl text-white opacity-90 backdrop-blur-sm"
        >
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="flex flex-col justify-center text-sm leading-tight">
          <span className="font-bold">{kind}</span>
          <span>{describe}</span>
        </div>
      </div>
      <span
        className={classNames({
          "text-red-500": type === "expense",
          "text-green-500": type === "income",
          "!text-sky-700": value === 0,
        })}
      >
        {type === "expense" && value !== 0 && !isPercent && "-"}
        {isPercent ? value : Money.format(value)}
      </span>
    </li>
  );
}

export default ItemExpense;
