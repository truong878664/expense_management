"use client";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

function NotePage() {
  const route = useRouter();
  return (
    <div className="animate-show-left h-full w-full border-l">
      <div className="mb-2 flex justify-between border-b px-4 py-2 font-bold capitalize">
        <button onClick={route.back} className="px-3">
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span>Ghi chú</span>
        <button disabled className="disabled:opacity-50">
          Xong
        </button>
      </div>
      <div className="px-4">
        <div
          className="min-h-[100px] outline-none"
          contentEditable
          placeholder="Thêm ghi chú"
        ></div>
      </div>
    </div>
  );
}

export default NotePage;
