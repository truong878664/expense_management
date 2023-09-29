"use client";
import classNames from "classnames";
import Link from "next/link";

interface LiDate {
  title: string;
  active?: boolean;
  value: string;
  onClick: any;
}

function LiDate({ title, active, value, onClick }: LiDate) {
  const classItemActive = classNames(
    "[&.active]:font-bold [&.active]:border-black/60",
    { active },
  );
  // console.log("render lide");

  return (
    <li>
      <button
        onClick={onClick}
        className={`border-b-2 border-transparent px-2 py-2 uppercase hover:border-gray-200 hover:font-medium ${classItemActive}`}
      >
        {title}
      </button>
    </li>
  );
}

{
  /* <Link
  href={{ pathname: "/", query: { date: value } }}
  className={`border-b-2 border-transparent px-2 py-2 uppercase hover:border-gray-200 hover:font-medium ${classItemActive}`}
>
  {title}
</Link> */
}
export default LiDate;
