"use client";
import iconList from "@/function/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function pageIcon() {
  return (
    <div className="grid grid-cols-5 gap-3 text-3xl">
      {iconList.map((icon) => {
        return <FontAwesomeIcon key={icon.id} icon={icon.icon} />;
      })}
    </div>
  );
}

export default pageIcon;
