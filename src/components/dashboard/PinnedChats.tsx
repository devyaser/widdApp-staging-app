import Image from "next/image";
import ClickableCard from "../common/ClickableCard";
// import { useChatSelector } from "store/features/chat/chatSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPinnedTopics } from "services/topics.services";
import {
  setPinnedTopics,
  useTopicsSelector,
} from "store/features/topics/topics";
import { FaSpinner } from "react-icons/fa";

function PinnedChatItem({
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
          <br />
          <span className="text-custom-sky">@{chat.createdBy?.userName}</span>
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

export default function PinnedTopics() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { pinnedTopics } = useTopicsSelector();
  // const { pinnedChats } = useChatSelector();
  const router = useRouter();
  const [pagination] = useState<IPagination>({
    page: 1,
    pageSize: 100,
  });

  const handleChatClick = (id: string) => {
    router.push(`?type=dao_details&id=${id}`);
  };

  const handleClick = () => {
    router.push("?type=pinned_topics");
  };

  const handleGetPinnnedTopics = () => {
    setLoading(true);
    getAllPinnedTopics(pagination).then((res) => {
      dispatch(setPinnedTopics(res?.data?.data));
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGetPinnnedTopics();
  }, []);

  return (
    <ClickableCard title={"Pinned Topics"} handleClick={handleClick}>
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <FaSpinner className="animate-spin transition duration-1000" />
          </div>
        ) : pinnedTopics?.length > 0 ? (
          <PinnedChatItem
            chat={pinnedTopics[0]}
            handleChatClick={handleChatClick}
          />
        ) : (
          <div className="bg-custom-lightgrayone py-[10px] pr-5 pl-2 flex items-center justify-center w-full gap-2 rounded-[5px] overflow-hidden">
            <p className="text-custom-hash text-sm">No Pinned Topics!</p>
          </div>
        )}
      </div>
    </ClickableCard>
  );
}
