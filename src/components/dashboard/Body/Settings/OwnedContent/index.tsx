import React, { useEffect } from "react";
import TopicItem from "./TopicItem";
import { mock_all_topics } from "mock-data";
// import { getOwnedTopics } from "services/topics.services";
import { useRouter } from "next/router";
import {
  getOwnedTopicsAsync,
  useTopicsSelector,
  removeTopic,
} from "store/features/topics/topics";
import Loader from "@/components/common/Loader";
import { useAppDispatch } from "store/store";
import { updateTopic } from "services/topics.services";
import { TOPIC_STATUS } from "utils/common";
import { useUserSelector } from "store/features/user/userSlice";

const OwnedContent = () => {
  const router = useRouter();
  const { ownedTopics, topicsLoader } = useTopicsSelector();
  const dispatch = useAppDispatch();
  const { user } = useUserSelector();

  const handleClick = (chatId: string) => {
    router.push(`?type=dao_details&id=${chatId}`);
  };

  const handleEdit = (e: any, id: string) => {
    e.stopPropagation();
    // console.log(id);
  };
  const handleEnd = (e: any, id: string) => {
    e.stopPropagation();
    updateTopic({ topicId: id, status: TOPIC_STATUS.ENDED })
      .then((res) => {
        dispatch(removeTopic(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(getOwnedTopicsAsync());
  }, []);

  return (
    <div>
      <div className="font-semibold">Owned Content</div>
      <div className="text-[13px]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
      </div>

      <div className="bg-custom-lightgrayone mt-4 rounded-md max-h-[38vh] lg:max-h-[50vh] overflow-auto no-scrollbar">
        {ownedTopics?.map((topic: ITopic, idx: number) => (
          <TopicItem
            key={topic?._id as string}
            title={topic?.topicName}
            createdAt={topic?.createdAt}
            avatar={""}
            username={""}
            tags={['CHAT', 'DAO', 'NFT']}
            handleClick={() => handleClick(topic._id)}
            handleEdit={(e: any) => handleEdit(e, topic._id)}
            handleEnd={(e: any) => handleEnd(e, topic._id)}
          />
        ))}
      </div>

      {topicsLoader && <Loader />}
    </div>
  );
};

export default OwnedContent;
