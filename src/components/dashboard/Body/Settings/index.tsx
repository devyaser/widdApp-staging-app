import LargeCardTabs from "../../../common/LargeCardTabs";
import React, { useState } from "react";
import Profile from "./Profile";
import Wallet from "./Wallet";
import OwnedContent from "./OwnedContent";
import FollowedUsers from "./FollowedUsers";
import { useRouter } from "next/router";

const tabs = ["Profile", "Wallet", "Owned Content", "Followed Users"];

const Settings = () => {
  const router = useRouter();
  const { type } = router.query;

  const onTabClick = (tab: string) => {
    if (tab === "Profile") {
      router.push("?type=settings/profile");
    } else if (tab === "Wallet") {
      router.push("?type=settings/wallet");
    } else if (tab === "Owned Content") {
      router.push("?type=settings/owned-content");
    } else if (tab === "Followed Users") {
      router.push("?type=settings/followed-users");
    }
  };

  const content = () => {
    switch (type) {
      case "settings/wallet":
        return <Wallet />;
      case "settings/owned-content":
        return <OwnedContent />;
      case "settings/followed-users":
        return <FollowedUsers />;
      case "settings/profile":
        return <Profile />;
      default:
        return null;
    }
  };

  const getActiveTabe = () => {
    switch (type) {
      case "settings/wallet":
        return "Wallet";
      case "settings/owned-content":
        return "Owned Content";
      case "settings/followed-users":
        return "Followed Users";
      default:
        return "Profile";
    }
  };

  return (
    <LargeCardTabs
      title="Settings"
      tabs={tabs}
      activeTab={getActiveTabe()}
      onTabClick={onTabClick}
    >
      <div className="mt-4">{content()}</div>
    </LargeCardTabs>
  );
};

export default Settings;
