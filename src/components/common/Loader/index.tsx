import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex py-4 w-full h-full">
      <FaSpinner className="animate-spin m-auto text-2xl" />
    </div>
  );
};

export default Loader;
