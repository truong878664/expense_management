import Link from "next/link";
import ItemExpense from "../expense/ItemExpense";
import { faPaw, faRibbon } from "@fortawesome/free-solid-svg-icons";

function RecentTransaction() {
  return (
    <section className="mt-5">
      <div className="flex justify-between text-sm font-bold ">
        <span>Giao dịch gầy đây</span>
        <Link href={"/"} className="text-c-green">
          Xem tất cả
        </Link>
      </div>

      <ul className="mt-2 flex flex-col gap-4 rounded-2xl bg-gray-100 px-3 py-5">
        <ItemExpense
          type="expense"
          kind={"Không có tiêu đề"}
          describe={"nothing"}
          value={"100000"}
          icon={faRibbon}
          color={"#F875AA"}
        />
        <ItemExpense
          type="income"
          kind={"Không có tiêu đề"}
          describe={"nothing"}
          value={"1209412"}
          icon={faPaw}
          color={"#F875AA"}
        />
      </ul>
    </section>
  );
}

export default RecentTransaction;
