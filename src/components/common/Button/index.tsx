import classNames from "classnames";
import React from "react";
import { FaSpinner } from "react-icons/fa";

const getVariantClass = (variant: string) => {
  switch (variant) {
    case "danger":
      return "text-white whitespace-pre max-w-fit bg-red-700 text-xs border-none outline-none rounded-md py-2 px-4";
    case "dark":
      return "text-white whitespace-pre max-w-fit bg-black text-xs border-none outline-none rounded-md py-2 px-4";
    default:
      return "h-[50px] text-lg font-bold rounded-[5px] text-white normal-case btn bg-custom-default hover:bg-custom-default border-custom-default focus:border-custom-default mt-6 w-full";
  }
};

const Button = ({
  isLoading,
  type = "button",
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: {
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  children: any;
  onClick?: any;
  variant?: "dark" | "primary" | "danger";
  disabled?: boolean;
}) => {
  return (
    <button
      type={type}
      className={classNames(
        getVariantClass(variant),
        disabled ? "cursor-not-allowed" : "flex justify-center items-center gap-2"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading && (
        <FaSpinner className="animate-spin transition duration-1000" />
      )}
      {children}
    </button>
  );
};

export default Button;
