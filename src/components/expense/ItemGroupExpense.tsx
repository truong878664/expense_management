import { faBacterium } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

function ItemGroupExpense({
  title = "Ăn uống",
  icon,
  color = "#000000",
  onClick,
}: {
  title: string;
  icon?: any;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center border-b border-gray-500/10 py-2 last:border-0"
    >
      <div
        className="mr-4 grid aspect-square w-11 place-content-center rounded-full text-2xl text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <span>{title}</span>
    </button>
  );
}

export default ItemGroupExpense;
