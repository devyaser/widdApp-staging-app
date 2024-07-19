import classNames from "classnames";
import React from "react";

const FormError = ({ isShrink, msg }: { isShrink?: boolean; msg: string }) => {
  return (
    <div
      className={classNames(
        "mt-1 text-red-500",
        isShrink ? "text-sm font-normal" : ""
      )}
    >
      {msg}
    </div>
  );
};

export default FormError;
