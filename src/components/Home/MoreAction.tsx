import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RefObject, useRef, useState } from "react";
import WrapperSelect from "../app/WrapperSelect";
import Button from "../app/Button";
import downloadXlsx from "@/function/downloadXlsx";
import { Expense } from "@/app/expenseSlice";

function MoreAction({ expense }: { expense: Expense }) {
  const removeButtonRef: RefObject<HTMLButtonElement> = useRef(null);
  const [SelectMore, setSelectMore] = useState<React.ReactNode>(null);
  const onToggleSelectMore = () => {
    setSelectMore(
      <WrapperSelect
        handleRemove={() => {
          setSelectMore(null);
        }}
        removeButton={removeButtonRef}
      >
        <Button
          onClick={() => {
            downloadXlsx("expense.xlsx", expense);
          }}
        >
          Export file excel
        </Button>
        <Button disable>Điều chỉnh số dư ví ban đầu</Button>
        <Button disable>Khoảng thời gian</Button>
        <Button disable>Xem theo nhóm</Button>
        <Button disable>Chuyển tiền đến ví khác</Button>
        <Button disable>Đồng bộ ví</Button>
      </WrapperSelect>,
    );
  };
  return (
    <>
      <div className="relative">
        <button
          onClick={onToggleSelectMore}
          className="min-w-[40px] rounded-md px-3 py-1"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      </div>
      {SelectMore}
    </>
  );
}

export default MoreAction;
