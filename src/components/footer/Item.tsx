import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
function ItemFooter({
  icon,
  title,
  active,
  href,
}: {
  icon: IconProp;
  title: string;
  active?: boolean;
  href: string;
}) {
  const classItemActive = classNames(
    "[&.active]:text-gray-900 [&.active]:font-bold",
    { active },
  );

  return (
    <li className="grid place-content-center">
      <Link
        href={href}
        className={`${classItemActive} flex flex-col items-center justify-end gap-1 p-1 text-gray-400 hover:text-gray-500`}
      >
        <FontAwesomeIcon className="text-xl" icon={icon} />
        <span className="text-xs">{title}</span>
      </Link>
    </li>
  );
}

export default ItemFooter;
