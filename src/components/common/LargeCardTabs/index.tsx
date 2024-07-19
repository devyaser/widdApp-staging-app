import classNames from "classnames";
import React from "react";

const LargeCardTabs = ({
  title,
  children,
  isTabs = true,
  tabs = [],
  activeTab,
  onTabClick,
}: {
  title: string;
  children: any;
  isTabs?: boolean;
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}) => {
  return (
    <div className="rounded-t-[5px] border border-custom-border bg-custom-lightgraytwo text-white flex flex-col flex-1 pt-3 pb-1 lg:py-3 px-[10px] lg:px-5 h-full mx-[-8px] lg:m-0">
      <div className="text-[24px]">{title}</div>
      {isTabs && <div className="flex mt-4 border-b md:gap-8 border-b-darkgrayfour ">
        {tabs.map((item) => (
          <div
            key={item}
            className={classNames(
              "text-sm relative truncate px-2 py-1 md:px-[25px] md:py-[15px] font-semibold cursor-pointer transition-all ease-in-out duration-300 ",
              item === activeTab &&
                "after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-custom-green text-custom-green"
            )}
            onClick={() => onTabClick(item)}
          >
            {item}
          </div>
        ))}
      </div>}
      <div className="overflow-auto no-scrollbar">{children}</div>
    </div>
  );
};

export default LargeCardTabs;
