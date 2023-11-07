"use client";
import Money from "@/function/formatMoney";
import useQueryParams from "@/hooks/useQueryParams";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

function ShowMoney({ money }: { money: number }) {
  const [valueMoney, setValueMoney] = useState(Money.format(money));
  const valueHidden = "***********";
  const onHiddenMoney = () => {
    valueHidden === valueMoney
      ? setValueMoney(Money.format(money))
      : setValueMoney(valueHidden);
  };

  const params = useQueryParams();
  const isShowMoney = params.get("show-money");
  const paramsString = params.paramsString();
  console.log(isShowMoney);
  if (isShowMoney) {
    console.log(paramsString + isShowMoney);
  }

  return (
    <div className="flex items-center">
      <span className="mr-4 text-2xl font-bold">{valueMoney}</span>
      {/* <button onClick={onHiddenMoney} className="">
        <FontAwesomeIcon
          icon={valueHidden === valueMoney ? faEye : faEyeSlash}
        />
      </button> */}
      <Link href={"/"}>
        <FontAwesomeIcon
          icon={valueHidden === valueMoney ? faEye : faEyeSlash}
        />
      </Link>
    </div>
  );
}

export default ShowMoney;
