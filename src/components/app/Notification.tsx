import Lottie from "lottie-web";
import { RefObject, useEffect, useRef } from "react";
import success from "./animation/success.json";
import error from "./animation/error.json";
import classNames from "classnames";

function Notification({ status }: { status: "error" | "success" }) {
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const emptyNode = (node: HTMLElement) => {
    while (node?.firstChild) {
      node?.removeChild(node?.firstChild);
    }
  };
  useEffect(() => {
    if (ref.current) {
      emptyNode(ref.current);
      const icon = Lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: status === "error" ? error : success,
      });
      (icon as any).onComplete = () => {
        setTimeout(() => {
          if (ref.current) ref.current.remove();
        }, 1000);
      };
    }
  }, []);

  const className = classNames(
    "fixed left-1/2 top-3 z-100 aspect-square h-16 -translate-x-1/2 rounded-2xl border-2 p-3 shadow-md backdrop-blur-sm",
    {
      "border-green-400/20 bg-green-200/20": status === "success",
      "border-red-400/20 bg-red-200/20": status === "error",
    },
  );
  return <div id="animate" className={className} ref={ref}></div>;
}

export default Notification;
