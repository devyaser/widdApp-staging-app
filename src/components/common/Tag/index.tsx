import cn from "classnames";
import React from "react";

const Tag = ({
  text,
  variant = "default",
}: {
  text: string;
  variant?: "default" | "success";
}) => {
  return (
    <div
      className={cn(
        " px-2 bg-custom-lightgraytwo border rounded-md text-[11px] text-white flex justify-center items-center",
        variant === "success" ? "border-custom-green" : "border-custom-default"
      )}
    >
      {text}
    </div>
  );
};

export default Tag;
