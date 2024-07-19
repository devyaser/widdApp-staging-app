import LargeCard from "../../../common/LargeCard";
import { useRouter } from "next/router";
import { mock_all_nft } from "../../../../mock-data";
import Footer from "./../Footer";
import NftItem from "./NftItem";
import { useAppDispatch } from "store/store";
import { useCallback, useEffect, useState } from "react";
import { useUserSelector } from "store/features/user/userSlice";
import { fetchNFTTopicsAsync, useTopicsSelector } from "store/features/topics/topics";
import { TOPICS_AUDIENCE } from "utils/common";
import { toast } from "react-toastify";

export default function Nft() {
  const router = useRouter();
  const { NFTTopics } = useTopicsSelector();
  const { user } = useUserSelector();
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleClick = (chatId: string) => {
    router.push(`?type=chat&id=${chatId}`);
  };

  const handleClose = () => {
    router.back();
  };

  const handleGetNFTTopics = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(fetchNFTTopicsAsync({ pagination, userId: user?._id as string }));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  }, [user, pagination, dispatch]);

  useEffect(() => {
    handleGetNFTTopics();
  }, [handleGetNFTTopics]);

  return (
    <LargeCard
      title="NFT"
      subHeader={null}
      actions={null}
      close
      handleClose={handleClose}
      searchAble
    >
      <div className="relative max-h-[calc(100%-100px)] overflow-auto no-scrollbar space-y-1 pb-[70px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  justify-center sm:justify-start gap-5 mt-4">
        {NFTTopics.map((topic: ITopic) => (
          <NftItem
            key={topic._id}
            avatar={
              topic?.thumbnailUrl ?? topic?.uploadImagesUrl?.[0] ?? "https://picsum.photos/200/300"
            }
            chatLink={`?type=chat&id=${topic._id}`}
            tags={
              topic.audience === TOPICS_AUDIENCE.PUBLIC
                ? [TOPICS_AUDIENCE.PUBLIC]
                : [TOPICS_AUDIENCE.PRIVATE]
            }
            handleClick={() => handleClick(topic._id)}
          />
        ))}
      </div>
      <Footer />
    </LargeCard>
  );
}
