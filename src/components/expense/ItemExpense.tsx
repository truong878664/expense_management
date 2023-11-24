import Money from "@/function/formatMoney";
import shortHandString from "@/function/shortHandString";
import useQueryParams from "@/hooks/useQueryParams";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";

function ItemExpense({
  id,
  type = "expense",
  kind,
  describe,
  value,
  icon,
  color,
}: {
  type: "income" | "expense";
  id: string | number;
  kind: string;
  describe: string;
  value: number | string;
  icon: IconProp;
  color: `#${string}`;
}) {
  const isPercent = value.toString().indexOf("%") !== -1;

  return (
    <Link href={"detail-expense/" + id + useQueryParams().paramsString()}>
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
            <span>{shortHandString(describe)}</span>
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
    </Link>
  );
}

export default ItemExpense;
