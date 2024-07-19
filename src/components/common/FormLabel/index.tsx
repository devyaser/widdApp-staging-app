import classNames from "classnames";
import React from "react";

const FormLabel = ({
  isShrink,
  label,
  subLable,
}: {
  isShrink?: boolean;
  label: string;
  subLable?: string;
}) => {
  return (
    <div
      className={
        (classNames(" text-white font-bold leading-[22px]"),
        isShrink ? "mb-1 text-md" : "mb-5 text-lg")
      }
    >
      {label}
      {subLable && (
        <span className="uppercase font-[300] underline pl-2 ">{subLable}</span>
      )}
    </div>
  );
};

export default FormLabel;
