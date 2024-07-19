import { useSession } from "next-auth/client";
import Image from "next/image";
import { useState } from "react";

import Leaderboard from "../Leaderboard";
import Trending, { TrendingItem } from "../Trending";
import { useWindowSize } from "usehooks-ts";
import { current } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { trendings } from "../../../mock-data";
import { Carousel } from "react-responsive-carousel";
import AllTopics from "../AllTopics";
import MyTopics from "../MyChats";
import PinnedTopics from "../PinnedChats";
import Pill from "@/components/common/Pill";
import { useUserSelector } from "store/features/user/userSlice";

export default function PopupBar({
  handleStartChat,
}: {
  handleStartChat: Function;
}) {
  const types = ["pinned topics", "leaderboard", "trending"];
  const allTopics = ["Chat", "DAO", "NFT", "Crypto"];
  const [active, setActive] = useState<number | null>(null);
  const {user} = useUserSelector();
  const [currentType, setCurrentType] = useState(2);
  const router = useRouter();
  const session = useSession();

  const handleCategory = (category: string, ind: number) => {
    setActive(ind);
    router.push(`?type=${category}`);
  };

  const increaseType = () => {
    setCurrentType(currentType < types.length - 1 ? currentType + 1 : 0);
  };

  const decreaseType = () => {
    setCurrentType(currentType > 0 ? currentType - 1 : types.length - 1);
  };

  const handleClick = () => {
    switch (types[currentType]) {
      case "pinned topics":
        router.push("?type=pinned_topics");
        break;
      case "leaderboard":
        router.push("?type=leaderboard");
        break;
      case "trending":
        router.push("?type=all_chats");
        break;
    }
  };

  const { width } = useWindowSize();

  if (width < 992) {
    const type = types[currentType];
    return (
      <>
        <div className="py-2 flex items-start lg:hidden border-b border-custom-border gap-[6px]">
          <button
            className="p-[6px] btn normal-case h-auto min-h-fit text-xs font-medium bg-custom-primary hover:bg-custom-primary text-white border-custom-primary hover:border-custom-primary"
            onClick={() => handleStartChat()}
          >
            Start A Topic
          </button>
          {session && (
            <div className="flex flex-wrap gap-2">
              {allTopics.map((item, indx) => (
                <Pill
                  key={indx}
                  title={item}
                  handleClick={() => handleCategory(item, indx)}
                  isActive={active === indx}
                  isSmall
                />
              ))}
            </div>
          )}
        </div>
        {/* <div className="flex items-center h-[40px] lg:hidden border-b gap-2 py-[5px] border-custom-border">
          <button
            className="h-auto p-0 bg-transparent border-none btn min-h-fit hover:bg-transparent hover:border-none"
            onClick={() => decreaseType()}
          >
            <Image
              src="/icons/arrow-left.svg"
              width={24}
              height={24}
              alt="Left Arrow"
            />
          </button>
          <div className="text-sm font-bold uppercase text-custom-darkgraythree">
            {type}
          </div>
          <div className="flex-1" onClick={() => handleClick()}>
            <Carousel
              axis="vertical"
              autoPlay
              interval={1000}
              infiniteLoop
              showStatus={false}
              showArrows={false}
              showIndicators={false}
              showThumbs={false}
            >
              {trendings.map((trendingItem, leaderIdx) => (
                <div key={leaderIdx} className="h-[28px]">
                  <TrendingItem
                    rank={leaderIdx + 1}
                    key={leaderIdx}
                    label={trendingItem.label}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <button
            className="h-auto p-0 bg-transparent border-none btn min-h-fit hover:bg-transparent hover:border-none"
            onClick={() => increaseType()}
          >
            <Image
              src="/icons/arrow-right.svg"
              width={24}
              height={24}
              alt="Right Arrow"
            />
          </button>
        </div> */}
      </>
    );
  }

  return (
    <div className="w-[275px] p-2 lg:block hidden">
      <div className="p-2 pb-4 border-b border-custom-border">
        <button
          className="text-base font-medium text-white normal-case btn btn-block bg-custom-primary hover:bg-custom-primary border-custom-primary hover:border-custom-primary"
          onClick={() => handleStartChat()}
        >
          Start A Topic
        </button>
      </div>
      <div className="max-h-[calc(100%-56px)] overflow-auto no-scrollbar">
        <AllTopics />
        {user && <PinnedTopics />}
        {user && <MyTopics />}
        {/* <Leaderboard /> */}
        {/* <Trending /> */}
      </div>
    </div>
  );
}
