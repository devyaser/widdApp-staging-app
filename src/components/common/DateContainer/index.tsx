import React from "react";

const DateContainer = ({ date }: { date: string }) => {
  return (
    <>
      <div className="hidden lg:block text-[11px] text-custom-darkgraytwo">
        {date}
      </div>
      <div className="lg:hidden text-[11px] text-custom-darkgraytwo">
        {date}
      </div>
    </>
  );
};

export default DateContainer;
