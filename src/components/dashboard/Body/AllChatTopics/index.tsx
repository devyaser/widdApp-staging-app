import LargeCard from "../../../common/LargeCard";
import { useRouter } from "next/router";
import Footer from "../Footer";
import ChatTopicItem from "./ChatTopicItem";
import { fetchChatTopicsAsync, useTopicsSelector } from "store/features/topics/topics";
import { useUserSelector } from "store/features/user/userSlice";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "store/store";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";

export default function AllChatTopics() {
  const router = useRouter();
  const { chatTopics, topicsLoader } = useTopicsSelector();
  const { user } = useUserSelector();
  const [pagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
  });

  const dispatch = useAppDispatch();

  const handleClick = (chatId: string) => {
    router.push(`?type=chat_details&id=${chatId}`);
  };

  const handleClose = () => {
    router.back();
  };

  const handleGetChatTopics = useCallback(async () => {
    try {
      await dispatch(fetchChatTopicsAsync({ pagination, userId: user?._id as string }));
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  }, [user, pagination, dispatch]);

  useEffect(() => {
    handleGetChatTopics();
  }, [handleGetChatTopics]);

  return (
    <LargeCard
      title="Chat"
      subHeader={null}
      actions={null}
      close
      handleClose={handleClose}
      searchAble
    >
      <div className="relative max-h-[calc(100%-100px)] overflow-auto no-scrollbar space-y-1 pb-[70px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-5 justify-center sm:justify-start mt-4">
        {chatTopics.map((topic: ITopic, idx: number) => (
          <ChatTopicItem
            key={topic?.id}
            avatar={topic.uploadImagesUrl[0] ?? "https://picsum.photos/200"}
            title={topic.topicName}
            username={topic.createdBy[0]?.displayName as string}
            tags={topic.type}
            createdAt={topic.createdAt}
            handleClick={() => handleClick(topic._id)}
          />
        ))}
        {topicsLoader && <Loader />}
      </div>
      <Footer />
    </LargeCard>
  );
}
