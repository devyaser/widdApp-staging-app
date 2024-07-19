import LargeCardTabs from "../../../common/LargeCardTabs";
import React, { useState } from "react";
import DaoTab from "./DaoTab";
import ChatTab from "./ChatTab";

const tabs = ["Chat", "DAO"];

const StartTopic = () => {
  const [activeTab, setActiveTab] = useState("DAO");

  const onTabClick = (tab: string) => {
    setActiveTab("DAO");
  };


  return (
    <LargeCardTabs
      title="Start A Topic"
      tabs={tabs}
      isTabs={false}
      activeTab={activeTab}
      onTabClick={onTabClick}
    >
      <DaoTab />
    </LargeCardTabs>
  );
};

export default StartTopic;
