import Image from "next/image";
import { useEffect, useState } from "react";
import box from "@/assets/empty-box.png";

function EmptyBox({ dependency }: { dependency?: unknown }) {
  const [bgEmptyBox, setBgEmptyBox] = useState("");
  useEffect(() => {
    setBgEmptyBox(
      "#" + Math.floor(Math.random() * 16777215).toString(16) + "22",
    );
  }, [dependency]);
  return (
    <div className="grid flex-1 place-content-center bg-cyan-50/20">
      <div className="relative h-72 w-72 p-16">
        <div
          className="absolute left-0 top-0 -z-1 h-full w-full rounded-full blur-3xl"
          style={{
            backgroundColor: bgEmptyBox,
          }}
        ></div>
        <Image
          src={box.src}
          width={box.width}
          height={box.height}
          alt="Empty box error"
          className="grid h-full place-content-center object-contain text-center font-bold text-red-500"
          priority
        />
        <div className="mt-2 text-center text-slate-700">
          Không có giao dịch
        </div>
      </div>
    </div>
  );
}

export default EmptyBox;
