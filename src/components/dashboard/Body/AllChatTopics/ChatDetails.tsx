import React, { useCallback, useEffect, useState } from "react";
import Chat from "../Chat";
import { useRouter } from "next/router";
import { useAppDispatch } from "store/store";

import { useChatSelector } from "store/features/chat/chatSlice";
import { getTopicByIdAsync } from "store/features/topics/topics";
import { TOPICS_AUDIENCE } from "utils/common";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const ChatDetails = ({
  inModal,
  topicId,
  setLoginModalOpen,
}: {
  inModal?: boolean;
  topicId?: string;
  setLoginModalOpen?: (value: boolean) => void;
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { pinnedChats } = useChatSelector();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [topicDetails, setTopicDetails] = useState<ITopic>({} as ITopic);

  const handleGetTopicById = useCallback(async () => {
    try {
      if (topicId) {
        setLoading(true);
        const { payload } = await dispatch(getTopicByIdAsync(topicId));
        console.log(payload);
        setTopicDetails(payload);
        setLoading(false);
      } else if (id) {
        setLoading(true);
        const { payload } = await dispatch(getTopicByIdAsync(id as string));
        console.log(payload);
        setTopicDetails(payload);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  }, [topicId, id, dispatch]);

  useEffect(() => {
    handleGetTopicById();
  }, [handleGetTopicById]);

  return (
    <Chat
      loading={loading}
      isNewsLetter={false}
      topicId={(topicId ?? id) as string}
      topicDetails={topicDetails}
      // updateTopicDetails={handleGetTopicById}
      title={topicDetails?.topicName}
      groupsMembers={topicDetails?.members}
      tags={[
        topicDetails?.isOwned
          ? "Owned"
          : topicDetails?.isJoined
          ? "Joined"
          : "Unjoined",
        topicDetails?.isPrivate ? "Private" : "Public",
      ]}
      inModal={inModal}
      setLoginModalOpen={setLoginModalOpen}
    />
  );
};

export default ChatDetails;
