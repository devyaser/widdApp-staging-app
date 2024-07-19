import { useRouter } from "next/router";
import Chat from "./Chat";
import PinnedChats from "./PinnedChats";
import Leaderboard from "./Leaderboard";

import AllTopics from "./AllTopics";
import Nft from "./Nft";
import Dao from "./Dao";
import AllChatTopics from "./AllChatTopics";
import DaoDetails from "./Dao/DaoDetails";
import Person from "./Person";
import StartTopic from "./StartTopic";
import Settings from "./Settings";
import { useEffect, useState } from "react";
import { getGlobalTopic } from "services/topics.services";
import { toast } from "react-toastify";
import { TOPICS_AUDIENCE } from "utils/common";
import dayjs from "dayjs";
import ChatDetails from "./AllChatTopics/ChatDetails";

interface IBodyProps {
  setLoginModalOpen: (value: boolean) => void;
}

export default function Body({ setLoginModalOpen }: IBodyProps) {
  const router = useRouter();
  const { type, id } = router.query;
  const [globalTopicId] = useState("6539374b5a3f155bc912c812");
  const [globalTopicDetails, setGlobalTopicDetails] = useState({} as ITopic);

  const handleGetGlobalTopic = () => {
    getGlobalTopic()
      .then((res) => {
        setGlobalTopicDetails(res?.data?.data as ITopic);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  useEffect(() => {
    handleGetGlobalTopic();
  }, [globalTopicId]);

  switch (type) {
    case "pinned_topics":
      return <PinnedChats />;
    case "leaderboard":
      return <Leaderboard />;
    case "all_topics":
      return <AllTopics />;
    case "NFT":
      return <Nft />;
    case "DAO":
      return <Dao setLoginModalOpen={setLoginModalOpen} />;
    case "dao_details":
      return <DaoDetails setLoginModalOpen={setLoginModalOpen} />;
    case "chat_details":
      return <ChatDetails setLoginModalOpen={setLoginModalOpen} />;
    case "Chat":
      return <AllChatTopics />;
    case "person":
      return <Person />;
    case "start_topic":
      return <StartTopic />;
    case "settings/profile":
      return <Settings />;
    case "settings/wallet":
      return <Settings />;
    case "settings/owned-content":
      return <Settings />;
    case "settings/followed-users":
      return <Settings />;

    default:
      return (
        <Chat
          loading={false}
          isNewsLetter={false}
          global={true}
          topicId={globalTopicId}
          topicDetails={globalTopicDetails}
          updateTopicDetails={handleGetGlobalTopic}
          title={globalTopicDetails?.topicName}
          groupsMembers={globalTopicDetails?.members}
          tags={["Public"]}
          inModal={false}
          setLoginModalOpen={setLoginModalOpen}
        />
      );
  }
}
