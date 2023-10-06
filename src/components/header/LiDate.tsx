"use client";
import classNames from "classnames";
import Link from "next/link";

interface LiDate {
  title: string;
  active?: boolean;
  value: string;
}

function LiDate({ title, active, value }: LiDate) {
  const classItemActive = classNames(
    "[&.active]:font-bold [&.active]:border-black/60",
    { active },
  );
  return (
    <li>
      <Link
        href={"?date=" + value}
        className={`border-b-2 border-transparent px-2 py-2 uppercase hover:border-gray-200 hover:font-medium ${classItemActive}`}
      >
        {title}
      </Link>
    </li>
  );
}
export default LiDate;
