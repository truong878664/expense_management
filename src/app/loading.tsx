"use client";
import { usePathname } from "next/navigation";

function Loading() {
  const pathname = usePathname();
  if (pathname.indexOf("/add-expense") !== -1) return;

  return (
    <div className="fixed-screen z-100 grid place-content-center bg-gray-800/20">
      <div className="grid place-content-center rounded-2xl bg-gray-800/90 p-8">
        <span className="loader"></span>
      </div>
    </div>
  );
}

export default Loading;
