import { useRouter } from "next/router";
import Footer from "../Footer";
import TopicItem from "./TopicItem";
import LargeCard from "@/components/common/LargeCard";
import { mock_all_topics } from "mock-data";
import { useTopicsSelector, fetchAllTopicsAsync } from "store/features/topics/topics";
import { useUserSelector } from "store/features/user/userSlice";
import { useAppDispatch } from "store/store";
import { useCallback, useEffect, useState } from "react";
import { TOPICS_CATEGORIES } from "utils/common";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";

export default function AllTopics() {
  const router = useRouter();
  const { allTopics, topicsLoader } = useTopicsSelector();
  const { user } = useUserSelector();
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
  });

  const dispatch = useAppDispatch();

  const handleClick = (chatId: string) => {
    router.push(`?type=chat&id=${chatId}`);
  };

  const handleClose = () => {
    router.back();
  };

  const handleGetAllTopics = useCallback(async () => {
    try {
      await dispatch(fetchAllTopicsAsync({ pagination, userId: user?._id as string }));
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  }, [user, pagination, dispatch]);

  useEffect(() => {
    handleGetAllTopics();
  }, [handleGetAllTopics]);

  return (
    <LargeCard
      title="All Topics"
      subHeader={null}
      actions={null}
      close
      handleClose={handleClose}
      searchAble
    >
      <div className="relative max-h-[calc(100%-100px)] overflow-auto no-scrollbar space-y-1 pb-[70px]">
        {allTopics.map((topic: ITopic) => (
          <TopicItem
            key={topic?._id}
            title={topic.topicName}
            avatar={topic.createdBy?.[0].profileImageUrl || ""}
            username={topic.createdBy?.[0]?.displayName || ""}
            tags={['CHAT', 'DAO', 'NFT']}
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

// export const getServerSideProps = async () => {
// const res = await getAllTopics();
// const topics = res.data.data;
// return {
//   props: {
//     topics,
//   },
// };
// };
