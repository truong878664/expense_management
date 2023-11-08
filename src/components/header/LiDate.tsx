"use client";
import useQueryParams from "@/hooks/useQueryParams";
import classNames from "classnames";
import Link from "next/link";

interface LiDate {
  title: string;
  active?: boolean;
  value: string;
}

function LiDate({ title, active, value }: LiDate) {
  const classItemActive = classNames(
    "[&.active]:border-black/60 [&.active]:font-bold",
    { active },
  );
  const params = useQueryParams().paramsString({ date: value });

  return (
    <li className="mb-[3px] mt-1">
      <Link
        href={params}
        className={`border-b-2 border-transparent px-2 py-1 uppercase hover:border-gray-200 hover:font-medium ${classItemActive}`}
      >
        {title}
      </Link>
    </li>
  );
}
export default LiDate;
