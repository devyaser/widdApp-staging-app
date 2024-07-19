import Image from "next/image";
import ClickableCard from "../common/ClickableCard";
import { useRouter } from "next/router";
import { useState } from "react";
import cn from "classnames";
import Pill from "../common/Pill";

const allTopics = ["Chat", "DAO", "NFT"];

export default function AllTopics() {
  // const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const router = useRouter();

  const handleClick = () => {
    router.push("?type=all_topics");
  };

  const handleCategory = (category: string, ind: number) => {
    setActive(ind);
    router.push(`?type=${category}`);
  };

  return (
    <ClickableCard title={"BROWSE All TOPICS"} handleClick={handleClick}>
      <div className="flex gap-2 flex-wrap mb-[17px] lg:mb-0">
        {allTopics.map((item, indx) => (
          <Pill
            key={indx}
            title={item}
            handleClick={() => handleCategory(item, indx)}
            isActive={active === indx}
          />
        ))}
      </div>
    </ClickableCard>
  );
}
