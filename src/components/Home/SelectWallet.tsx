import {
  faCaretDown,
  faCaretUp,
  faPlus,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RefObject, useRef, useState } from "react";
import WrapperSelect from "../app/WrapperSelect";
import Button from "../app/Button";
import Wallet from "../app/Wallet";

function SelectWallet() {
  const removeButtonRef: RefObject<HTMLButtonElement> = useRef(null);
  const buttonWalletRef: RefObject<HTMLButtonElement> = useRef(null);
  const [SelectWallet, setSelectWallet] = useState<React.ReactNode>(null);
  const onToggleSelectWallet = () => {
    if (buttonWalletRef.current) {
      buttonWalletRef.current.dataset.icon = "rotate";
    }

    setSelectWallet(
      <WrapperSelect
        handleRemove={() => {
          setSelectWallet(null);
          if (buttonWalletRef.current) {
            buttonWalletRef.current.dataset.icon = "none";
          }
        }}
        removeButton={removeButtonRef}
      >
        <Button>Tiền mặt</Button>
        <Button disable>Thêm ví</Button>
      </WrapperSelect>,
    );
  };
  return (
    <>
      <button
        ref={buttonWalletRef}
        onClick={onToggleSelectWallet}
        data-icon=""
        className="group/button-wallet flex items-center justify-center rounded-lg bg-gray-200 px-2 py-1"
      >
        <Wallet />
        <FontAwesomeIcon
          className="transition-all duration-300 group-data-[icon='rotate']/button-wallet:rotate-180 group-data-[icon='rotate']/button-wallet:text-sky-700"
          icon={faCaretUp}
        />
      </button>
      {SelectWallet}
    </>
  );
}

export default SelectWallet;
