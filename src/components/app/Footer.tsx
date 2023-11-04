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
import useQueryParams from "@/hooks/useQueryParams";

function Footer() {
  const route = useRouter();
  const pathname = usePathname();
  const paramsString = useQueryParams().paramsString();
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
  console.log();

  return (
    <footer className="z-10">
      <div className="w-full pb-4">
        <ul className="grid w-full grid-cols-5 whitespace-nowrap border-t">
          <ItemFooter
            active={pathname === "/overview"}
            href={"/overview" + paramsString}
            icon={faHouse}
            title="Tổng quan"
          />
          <ItemFooter
            active={pathname === "/"}
            href={"/" + paramsString}
            icon={faWallet}
            title="Sổ giao dịch"
          />
          <li className="relative z-0 grid place-content-center">
            {pathname === "/add-expense" && (
              <button
                onClick={onDismiss}
                className="absolute left-1/2 top-0 z-10 aspect-square w-14 -translate-x-1/2 -translate-y-1/4"
              ></button>
            )}
            <Link tabIndex={-1} href={"/add-expense" + paramsString}>
              <button
                className={`${
                  pathname.indexOf("/add-expense") !== -1
                    ? "rotate-[135deg] bg-red-400"
                    : "bg-c-green"
                } grid aspect-square w-12 -translate-y-1/4 place-content-center rounded-full text-2xl text-white shadow-md transition-all duration-700 `}
              >
                <FontAwesomeIcon icon={faPlus} className="blur-0" />
              </button>
            </Link>
          </li>
          <ItemFooter
            active={pathname === "/budget"}
            href={"/budget" + paramsString}
            icon={faClipboardList}
            title="Ngân sách"
          />
          <ItemFooter
            active={pathname === "/account"}
            href={"/account" + paramsString}
            icon={faUser}
            title="Tài khoản"
          />
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
