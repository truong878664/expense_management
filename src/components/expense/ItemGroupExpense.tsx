import { faBacterium } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ItemGroupExpense({
  title = "Ăn uống",
  icon,
  color = "#000000",
}: {
  title: string;
  icon?: any;
  color: string;
}) {
  return (
    <div className="flex items-center border-b border-gray-500/10 py-2 last:border-0">
      <div
        className="mr-4 grid aspect-square w-11 place-content-center rounded-full text-2xl shadow-sm"
        style={{ backgroundColor: `${color + "3F"}`, color: color }}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <span>{title}</span>
    </div>
  );
}

export default ItemGroupExpense;
