"use client";
import {
  faClipboardList,
  faHouse,
  faPlus,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ItemFooter from "../footer/Item";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getNode } from "@/function/getNode";

function Footer() {
  const route = useRouter();
  const pathname = usePathname();
  const onDismiss = () => {
    const addExpenseWrapper: HTMLDivElement | null = document.querySelector(
      "#add-expense-wrapper",
    );

    if (addExpenseWrapper) {
      addExpenseWrapper!.dataset.active = "hidden";
    }
    setTimeout(() => {
      route.back();
    }, 500);
  };

  return (
    <footer>
      <div className="w-full pb-4">
        <ul className="grid w-full grid-cols-5 whitespace-nowrap border-t">
          <ItemFooter
            active={pathname === "/overview"}
            href="/overview"
            icon={faHouse}
            title="Tổng quan"
          />
          <ItemFooter
            active={pathname === "/"}
            href="/"
            icon={faWallet}
            title="Sổ giao dịch"
          />
          <li className="relative grid place-content-center">
            {pathname === "/add-expense" && (
              <button
                onClick={onDismiss}
                className="absolute left-1/2 top-0 z-10 aspect-square w-14 -translate-x-1/2 -translate-y-1/4"
              ></button>
            )}
            <Link href={"/add-expense"}>
              <button
                className={`${
                  pathname === "/add-expense"
                    ? "rotate-[135deg] bg-red-400"
                    : "bg-[#5CB559]"
                } grid aspect-square w-14 -translate-y-1/4 place-content-center rounded-full text-2xl text-white shadow-md transition-all duration-700 `}
              >
                <FontAwesomeIcon icon={faPlus} className="blur-0" />
              </button>
            </Link>
          </li>
          <ItemFooter
            active={pathname === "/budget"}
            href="/budget"
            icon={faClipboardList}
            title="Ngân sách"
          />
          <ItemFooter
            active={pathname === "/account"}
            href="/account"
            icon={faUser}
            title="Tài khoản"
          />
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
