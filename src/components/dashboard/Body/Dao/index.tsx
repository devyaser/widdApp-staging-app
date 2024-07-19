import LargeCard from "../../../common/LargeCard";
import { useRouter } from "next/router";
import { posts } from "../../../../mock-data";
import Footer from "../Footer";
import DaoItem from "./DaoItem";
import { useCallback, useEffect, useState } from "react";
import {
  fetchDAOTopicsAsync,
  useTopicsSelector,
} from "store/features/topics/topics";
import { useUserSelector } from "store/features/user/userSlice";
import { TOPICS_AUDIENCE, TOPICS_CATEGORIES } from "utils/common";
import { useAppDispatch } from "store/store";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";

interface IDaoProps {
  setLoginModalOpen: (value: boolean) => void;
}

export default function Dao({ setLoginModalOpen }: IDaoProps) {
  const router = useRouter();
  const { DAOTopics, topicsLoader } = useTopicsSelector();
  const { user } = useUserSelector();
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 100,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClick = (daoId: string) => {
    router.push(`?type=dao_details&id=${daoId}`);
  };

  const handleClose = () => {
    router.back();
  };

  const handleGetDAOTopics = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(
        fetchDAOTopicsAsync({ pagination, userId: user?._id as string })
      );
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  }, [user, pagination, dispatch]);

  useEffect(() => {
    handleGetDAOTopics();
  }, [handleGetDAOTopics]);

  return (
    <LargeCard
      title="DAO"
      subHeader={null}
      actions={null}
      close
      handleClose={handleClose}
      searchAble
    >
      <div className="relative max-h-[calc(100%-100px)] overflow-auto no-scrollbar space-y-1 pb-[70px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 justify-center items-center sm:justify-start mt-4">
        {DAOTopics.map((topic: ITopic) => {
          return (
            <DaoItem
              key={topic._id}
              avatar={
                topic.uploadImagesUrl?.[0] ?? "https://picsum.photos/400/300"
              }
              title={topic.topicName}
              description={topic.mainDescription}
              handleClick={() => handleClick(topic._id)}
              isJoined={topic?.isJoined}
              isOwned={topic?.isOwned}
              isPrivate={topic?.isPrivate}
            />
          );
        })}
      </div>
      {topicsLoader && <Loader />}
      <Footer />
    </LargeCard>
  );
}
