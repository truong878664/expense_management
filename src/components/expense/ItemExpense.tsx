import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="flex">
        <div
          style={{ backgroundColor: color }}
          className="mr-2 grid aspect-square w-10 place-content-center rounded-full text-xl text-white opacity-90 backdrop-blur-sm"
        >
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="flex flex-col justify-center text-sm leading-tight">
          <span className="font-bold">{kind}</span>
          <span>{describe}</span>
        </div>
      </div>
      <span
        data-expense={type}
        className="data-[expense='expense']:text-red-500 data-[expense='income']:text-green-500"
      >
        {value}
      </span>
    </div>
  );
}

export default ItemExpense;
