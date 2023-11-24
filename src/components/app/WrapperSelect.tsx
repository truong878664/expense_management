import React, { RefObject, useEffect, useRef } from "react";
import Button from "./Button";
import gsap from "gsap";

type WrapperSelect = {
  children: React.ReactNode;
  handleRemove: (e: null) => void;
  removeButton: RefObject<HTMLButtonElement>;
};

function WrapperSelect({
  children,
  handleRemove,
  removeButton,
}: WrapperSelect) {
  const WrapperSelectRef: RefObject<HTMLDivElement> = useRef(null);
  const onRemove = () => {
    gsap.fromTo(
      WrapperSelectRef.current,
      { translateY: "0", opacity: 1 },
      {
        translateY: "100%",
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          handleRemove(null);
        },
      },
    );
  };

  useEffect(() => {
    gsap.fromTo(
      WrapperSelectRef.current,
      { translateY: "100%", opacity: 0 },
      { translateY: "0", duration: 0.2, opacity: 1 },
    );
  }, []);
  return (
    <div className="fixed left-0 top-0 z-11 grid h-full w-full items-end overflow-hidden bg-black/10 px-1">
      <div className="absolute-screen" onClick={onRemove}></div>
      <div
        className="z-1 mb-6 flex w-full shrink flex-col items-center justify-center px-1"
        ref={WrapperSelectRef}
      >
        {children}
        <Button onClick={onRemove} ref={removeButton}>
          Hủy
        </Button>
      </div>
    </div>
  );
}

export default WrapperSelect;
