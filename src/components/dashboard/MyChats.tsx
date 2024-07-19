import Image from "next/image";
import ClickableCard from "../common/ClickableCard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "store/store";
import {
  getOwnedTopicsAsync,
  useTopicsSelector,
} from "store/features/topics/topics";
import { FaSpinner } from "react-icons/fa";

function TopicItem({
  chat,
  handleChatClick,
}: {
  chat: any;
  handleChatClick: Function;
}) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => handleChatClick(chat._id)}
    >
      <div className="bg-custom-lightgrayone py-[10px] pr-5 pl-2 flex items-center w-full gap-2 rounded-[5px] overflow-hidden">
        <span className="text-3xl text-custom-hash text-bold">#</span>
        <p className="text-sm text-bold">
          <span className="text-white">
            {chat.topicName.length <= 30
              ? chat.topicName
              : `${chat.topicName.slice(0, 30)}...`}
            &nbsp;
          </span>
        </p>
      </div>
      <button
        className="p-0 bg-transparent border-none btn hover:bg-transparent hover:border-none"
        onClick={() => handleChatClick(chat._id)}
      >
        <Image
          src="/icons/down.svg"
          alt="Transfer Icon"
          width={30}
          height={30}
        />
      </button>
    </div>
  );
}

export default function MyTopics() {
  const dispatch = useAppDispatch();
  const { ownedTopics } = useTopicsSelector();
  const router = useRouter();
  const handleChatClick = (id: string) => {
    router.push(`?type=dao_details&id=${id}`);
  };

  const handleClick = () => {
    router.push("?type=settings/owned-content");
  };

  useEffect(() => {
    dispatch(getOwnedTopicsAsync());
  }, []);

  return (
    <ClickableCard title={"My Topics"} handleClick={handleClick}>
      <div className="flex flex-col gap-4">
        {false ? (
          <div className="flex items-center justify-center">
            <FaSpinner className="animate-spin transition duration-1000" />
          </div>
        ) : ownedTopics?.length > 0 ? (
          <TopicItem chat={ownedTopics[0]} handleChatClick={handleChatClick} />
        ) : (
          <div className="bg-custom-lightgrayone py-[10px] pr-5 pl-2 flex items-center justify-center w-full gap-2 rounded-[5px] overflow-hidden">
            <p className="text-custom-hash text-sm">No Topics!</p>
          </div>
        )}
      </div>
    </ClickableCard>
  );
}
