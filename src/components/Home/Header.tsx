"use client";
import {
  faCaretDown,
  faEllipsisVertical,
  faMagnifyingGlass,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LiDate from "../header/LiDate";
import { RefObject, useEffect, useRef } from "react";
import dateList from "@/function/dateList";
import useQueryParams from "@/hooks/useQueryParams";

import { useRouter } from "next/navigation";
import { Object } from "@/app/global";
import convertParams from "@/function/convertParam";

function Header() {
  const dateWrapperRef: RefObject<HTMLUListElement> = useRef(null);
  const behaviorRef = useRef<"auto" | "smooth">("auto");

  const dateNow = new Date().toLocaleDateString();
  const router = useRouter();

  const params = useQueryParams();
  const paramList = params.getAll();
  const dateParam: string = params.get("date") || dateNow;

  useEffect(() => {
    dateWrapperRef.current?.querySelector(".active")?.scrollIntoView({
      behavior: behaviorRef.current,
      block: "center",
      inline: "center",
    });
  }, [dateParam]);

  const onClick = (newQueryAdd: Object<string | number>) => {
    behaviorRef.current = "smooth";
    const param = convertParams({
      pathname: "/",
      query: paramList,
      newQuery: newQueryAdd,
    });
    router.push(param);
  };

  return (
    <header>
      <div className="relative pt-2">
        <div className="absolute right-4 top-2 flex gap-6">
          <button className="rounded-md px-3 py-1 hover:bg-gray-500/10">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button className="rounded-md px-3 py-1 hover:bg-gray-500/10">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col text-center">
            <span className="text-sm font-bold">Số dư</span>
            <span className="font-bold">7,234,242 đ</span>
          </div>
        </div>
        <div className="mt-2 grid place-content-center">
          <button className="flex items-center justify-center rounded-lg bg-gray-200 px-2 py-1">
            <FontAwesomeIcon
              icon={faWallet}
              className="rounded-full bg-[#366B8C]/50 p-1 text-orange-400/90"
            />
            <span className="px-2 text-sm font-bold">Tiền mặt</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </div>
        <div className="w-full border-b">
          <ul
            ref={dateWrapperRef}
            className="flex w-full select-none gap-4 overflow-y-hidden overflow-x-scroll whitespace-nowrap border-inherit px-6 py-2 scrollbar-none"
          >
            {dateList.map((date, index) => {
              return (
                <LiDate
                  onClick={() => onClick({ date: date.value })}
                  key={index}
                  active={dateParam === date.value}
                  value={date.value}
                  title={date.title}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
