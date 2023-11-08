"use client";
import Money from "@/function/formatMoney";
import useQueryParams from "@/hooks/useQueryParams";
import {
  faBell,
  faCircleQuestion,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Wallet from "../app/Wallet";

function HeaderOverview({
  finalBalance = 0,
  wallet = "",
}: {
  finalBalance?: number;
  wallet?: string;
}) {
  const valueHidden = "***********";
  const router = useRouter();
  const params = useQueryParams();
  const currentShowMoney = useQueryParams().get("money");
  const showMoneyRef = useRef<"hidden" | "show">(
    currentShowMoney as "hidden" | "show",
  );

  return (
    <>
      <header className="flex items-center justify-between">
        <div className="leading-3">
          <div className="flex items-center">
            <span className="mr-4 text-2xl font-bold">
              {currentShowMoney === "hidden"
                ? valueHidden
                : Money.format(finalBalance)}
            </span>
            <button
              onClick={() => {
                showMoneyRef.current =
                  showMoneyRef.current === "hidden" ? "show" : "hidden";
                router.push(
                  "overview" +
                    params.paramsString({ money: showMoneyRef.current }),
                );
              }}
              className=""
            >
              <FontAwesomeIcon
                icon={currentShowMoney === "hidden" ? faEye : faEyeSlash}
              />
            </button>
          </div>
          <span className="text-sm leading-3">
            <span className="mr-1">Tổng số dư</span>
            <FontAwesomeIcon
              className="text-gray-500"
              icon={faCircleQuestion}
            />
          </span>
        </div>
        <button className="text-xl">
          <FontAwesomeIcon icon={faBell} />
        </button>
      </header>
      <section className="mt-4 w-full rounded-2xl bg-gray-100 font-bold ">
        <div className="flex justify-between border-b p-3">
          <span>Ví của tôi</span>
          <button className="text-c-green">Xem tất cả</button>
        </div>
        <div className="flex justify-between p-3">
          <Wallet name={wallet} />
          <span>
            {currentShowMoney === "hidden"
              ? "*******"
              : Money.format(finalBalance)}
          </span>
        </div>
      </section>
    </>
  );
}

export default HeaderOverview;
