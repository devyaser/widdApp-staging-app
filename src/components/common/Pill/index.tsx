import cn from "classnames";
import React from "react";

const Pill = ({
  title,
  handleClick = () => {},
  isActive,
  isSmall,
}: {
  title: string;
  handleClick?: () => void;
  isActive?: boolean;
  isSmall?: boolean;
}) => {
  return (
    <button
      className={cn(
        "btn min-h-fit  normal-case text-xs font-normal text-white  rounded-[12px] border-2",
        isSmall ? "px-2 py-1 h-auto" : "px-4 py-2 h-[32px]",
        isActive
          ? "bg-custom-default hover:bg-custom-default"
          : "bg-custom-lightgraytwo hover:bg-custom-lightgraytwo",
        title.toUpperCase() === "CHAT" && " border-custom-purple",
        title.toUpperCase() === "DAO" && " border-custom-green",
        title.toUpperCase() === "NFT" && " border-custom-default",
        title.toUpperCase() === "CRYPTO" && " border-custom-yellow"
      )}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Pill;
