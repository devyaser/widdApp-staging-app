import LargeCard from "../../common/LargeCard";
import Image from "next/image";
import ChatBody from "./ChatBody";
import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { setUser, useUserSelector } from "store/features/user/userSlice";
import { AxiosError, AxiosResponse } from "axios";
import {
  getAllPinnedTopics,
  joinUserInTopic,
  pinTopic,
  unpinTopic,
} from "services/topics.services";
import { useAppDispatch } from "store/store";
import { getUserByToken } from "services/user.services";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { Socket, io } from "socket.io-client";
import { getMessagesByTopicId } from "services/chat.services";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/router";
import { setPinnedTopics } from "store/features/topics/topics";

const topCheers = [
  {
    medal: "/images/gold-medal.png",
    username: "Zekken",
    point1: 1200,
    point2: 30,
  },
  {
    medal: "/images/gold-medal-2.png",
    username: "Zekken",
    point1: 800,
    point2: 20,
  },
  {
    medal: "/images/gold-medal-3.png",
    username: "Zekken",
    point1: 110,
    point2: 10,
  },
];

export default function Chat({
  loading = false,
  isNewsLetter,
  topicId,
  title,
  global = false,
  updateTopicDetails,
  topicDetails,
  setLoginModalOpen,
  tags,
  groupsMembers = [],
  inModal,
}: {
  loading?: boolean;
  isNewsLetter: boolean;
  topicId?: string;
  global?: boolean;
  title: string;
  topicDetails?: ITopic;
  updateTopicDetails?: Function;
  setLoginModalOpen?: Function;
  tags?: string[];
  groupsMembers?: any[];
  inModal?: boolean;
}) {
  const [inputMessage, setInputMessage] = useState("");
  const [showPinned, setShowPinned] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef(null);
  const { user, token } = useUserSelector();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [joinLoading, setJoinLoading] = useState(false);
  const [socket, setSocket] = useState<Socket>({} as Socket);

  const togglePinned = () => {
    if (!showPinned) {
      pinTopic({ topicId: topicId || "" }).then(() => {
        getAllPinnedTopics({ page: 1, pageSize: 1 }).then((res) => {
          dispatch(setPinnedTopics(res?.data?.data));
        });
      });
    } else {
      unpinTopic({ topicId: topicId || "" }).then(() => {
        getAllPinnedTopics({ page: 1, pageSize: 1 }).then((res) => {
          dispatch(setPinnedTopics(res?.data?.data));
        });
      });
    }
    setShowPinned(!showPinned);
  };

  const scrollToBottom = () => {
    (messagesEndRef.current as any).scrollIntoView({ behavior: "smooth" });
  };

  const handleJoinUserInTopic = (userId: string) => {
    setJoinLoading(true);
    joinUserInTopic(topicId as string, userId)
      .then((res: AxiosResponse) => {
        updateTopicDetails?.();
        getUserByToken(localStorage.getItem("token") as string).then((res) => {
          dispatch(
            setUser({
              token: localStorage.getItem("token") as string as string,
              user: res.data.data,
              loading: false,
            })
          );
          toast.success("Joined successfully");
          setJoinLoading(false);
        });
      })
      .catch((err: AxiosError) => {
        console.log(err?.response?.data, "err====================");
      });
  };

  const handleGetTopicMessages = () => {
    setMessagesLoading(true);
    getMessagesByTopicId(topicId as string).then((res: AxiosResponse) => {
      setMessages(res?.data?.data);
    });
    setMessagesLoading(false);
  };

  useEffect(() => {
    if (isNewsLetter) {
      const topicDetailMessage: IMessage = {
        context: topicDetails?.mainDescription as string,
        _id: topicDetails?._id as string,
        createdAt: topicDetails?.createdAt,
        sender: {
          id: topicDetails?.createdBy?.[0]?._id,
          userName: topicDetails?.createdBy?.[0]?.userName,
          displayName: topicDetails?.createdBy?.[0]?.displayName,
          profileImageUrl: topicDetails?.createdBy?.[0]?.profileImageUrl,
        },
      };

      setMessages((prev) => {
        return [topicDetailMessage];
      });
    } else {
      handleGetTopicMessages();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [topicId]);

  useEffect(() => {
    setShowPinned(topicDetails?.isPinned ? true : false);
  }, [topicDetails]);

  const subHeader = (groupsMembers: any[]) => {
    return groupsMembers?.length > 0 ? (
      <div className="flex items-center">
        {groupsMembers.map((item: any, i: number) => (
          <div key={item?.members?.[0]?._id}>
            {i < 4 && (
              <div className="w-[30px] h-[30px] -mr-1 rounded-full overflow-hidden">
                <Image
                  src={
                    item?.members?.[0]?.profileImageUrl ??
                    "/images/Avatar 13.png"
                  }
                  alt="Light Green NFT"
                  width={30}
                  height={30}
                />
              </div>
            )}
            {i >= 4 && i == groupsMembers.length - 1 && (
              <div className="w-[30px] h-[30px] -mr-1 rounded-full overflow-hidden bg-custom-sky flex items-center justify-center text-xs font-semibold">
                +{i - 3}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="flex gap-1.5 items-center">
        <div className="lg:hidden w-[25px] h-[25px]">
          <Image
            src="/images/drone.gif"
            alt="Light Green NFT"
            width={25}
            height={25}
          />
        </div>
        <div className="hidden lg:block">
          <Image
            src="/images/drone-1.gif"
            alt="Light Green NFT"
            width={54}
            height={48}
          />
        </div>
        <span className="text-[13px] lg:text-base font-bold text-custom-sky">
          Worem
        </span>
      </div>
    );
  };

  const handleSearch = () => {
    setKeyword(searchKeyword);
  };

  const handleKeywordKeydown = (e: any) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSendMessage = useCallback(
    (e: any) => {
      if (e.keyCode === 13) {
        if (user) {
          if (global) {
            socket.emit(
              "message",
              {
                context: e.target.value,
                sender: {
                  _id: user?._id,
                  profileImageUrl: user?.profileImageUrl,
                  displayName: user?.displayName,
                  userName: user?.userName,
                },
                topicId: topicId as string,
              },
              ({ data }: { data: string }) => {
                setInputMessage("");
              }
            );
            setInputMessage("");
          } else if (
            groupsMembers.find((item) => item.members?.[0]?._id === user?._id)
          ) {
            socket.emit(
              "message",
              {
                context: e.target.value,
                sender: {
                  _id: user?._id,
                  profileImageUrl: user?.profileImageUrl,
                  displayName: user?.displayName,
                  userName: user?.userName,
                },
                topicId: topicId as string,
              },
              ({ data }: { data: string }) => {
                setInputMessage("");
              }
            );
            setInputMessage("");
          } else {
            handleJoinUserInTopic(user?._id);
            // dispatch(
            //   sendMessageAsync({
            //     topicId: topicId as string,
            //     message: e.target.value,
            //     userId: user?.id as string,
            //   })
            // ).then(() => {
            //
            // });

            socket.emit(
              "message",
              {
                context: e.target.value,
                sender: {
                  _id: user?._id,
                  profileImageUrl: user?.profileImageUrl,
                  displayName: user?.displayName,
                  userName: user?.userName,
                },
                topicId: topicId as string,
              },
              (data: string) => {
                // dispatch(addNewMessage(JSON.parse(data)));
                setInputMessage("");
                // console.log("DATA",data);
              }
            );
            setInputMessage("");
          }
        } else {
          setLoginModalOpen?.(true);
        }
      }
    },
    [user?._id, groupsMembers, socket?.connected, topicId]
  );

  const actions = () => {
    return (
      <div className="flex justify-end h-auto gap-2">
        {/* <div
            className={cn(
              "px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] ",
              isFollowed
                ? "bg-custom-default hover:bg-custom-default"
                : "bg-custom-lightgrayone hover:bg-custom-lightgrayone"
            )}
            onClick={() => handleFollow()}
          >
            <Image src="/icons/preview-open.svg" alt="Follow" width={18} height={18} />
          </div> */}
        {/* <div className="dropdown dropdown-bottom dropdown-end">
          <label
            tabIndex={0}
            className="px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] bg-custom-lightgrayone hover:bg-custom-lightgrayone"
          >
            <Image src="/icons/preview-open.svg" alt="Crown" width={18} height={18} />
          </label>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] menu p-5 shadow bg-custom-lightgraythree rounded-box w-[610px] h-[116px]"
          >
            <div className="flex justify-between w-full mb-2">
              <div className="text-sm font-bold text-custom-default">
                Yorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="text-[11px] text-custom-darkgraytwo">05/21/2023 5:45 AM</div>
            </div>
            <div className="text-[13px] text-custom-darkgrayfour">
              Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
              velit interdum, ac aliquet odio mattis.
            </div>
          </div>
        </div> */}
        {/* <div className="dropdown dropdown-bottom dropdown-end">
          <label
            tabIndex={0}
            className="px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] bg-custom-lightgrayone hover:bg-custom-lightgrayone"
          >
            <Image src="/icons/crown-three.svg" alt="Crown" width={18} height={18} />
          </label> */}
        {/* {width < 992 ? (
            <div
              tabIndex={0}
              className="dropdown-content translate-x-24 translate-y-1 z-[1] menu px-[10px] py-[15px] block shadow bg-custom-lightgraythree rounded-box w-[370px] gap-2 items-center"
            >
              <div className="flex mb-[15px] px-[15px] items-center justify-between">
                <div className="text-sm font-bold text-white">Top Cheerers</div>
                <button
                  className="btn min-h-fit h-auto p-[6px] text-xs normal-case text-white bg-custom-purple hover:bg-custom-purple border-custom-purple hover:border-custom-purple"
                  onClick={handleSearch}
                >
                  Cheer with BTIX
                </button>
              </div>
              <div className="flex flex-col gap-2 px-[11px]"> */}
        {/* {topCheers.map((cheer, idx) => (
                  <div className="flex gap-2 px-2" key={idx}>
                    <div className="flex gap-0.5">
                      <Image
                        src={cheer.medal ?? "/images/gold-medal.png"}
                        alt="Gold Medal"
                        width={20}
                        height={20}
                      />
                      <span className="text-sm text-white">@{cheer.username}</span>
                    </div>
                    <div className="flex gap-0.5">
                      <Image src="/icons/point1.svg" alt="Point1" width={12} height={15} />
                      <span className="text-sm text-white">{cheer.point1} BTIX</span>
                    </div>
                    <div className="flex gap-0.5">
                      <Image src="/icons/point2.svg" alt="Point2" width={12} height={15} />
                      <span className="text-sm text-white">{cheer.point2} BTIX</span>
                    </div>
                  </div>
                ))} */}
        {/* </div>
            </div> */}
        {/* ) : ( */}
        {/* <div
              tabIndex={0}
              className="dropdown-content z-[1] menu p-5 shadow bg-custom-lightgraythree rounded-box w-[620px] h-[116px] flex flex-row gap-2 items-center"
            >
              <div className="flex px-[30px] flex-col justify-center">
                <div className="text-sm font-bold text-white">Top Cheerers</div>
              </div>
              <div className="flex flex-col gap-2"> */}
        {/* {topCheers.map((cheer, idx) => (
                  <div className="flex gap-2" key={idx}>
                    <div className="flex gap-0.5">
                      <Image
                        src={cheer.medal ?? "/images/gold-medal.png"}
                        alt="Gold Medal"
                        width={20}
                        height={20}
                      />
                      <span className="text-sm text-white">@{cheer.username}</span>
                    </div>
                    <div className="flex gap-0.5">
                      <Image src="/icons/point1.svg" alt="Point1" width={12} height={15} />
                      <span className="text-sm text-white">{cheer.point1} BTIX</span>
                    </div>
                    <div className="flex gap-0.5">
                      <Image src="/icons/point2.svg" alt="Point2" width={12} height={15} />
                      <span className="text-sm text-white">{cheer.point2} BTIX</span>
                    </div>
                  </div>
                ))} */}
        {/* </div>
              <div>
                <button
                  className="text-white normal-case btn bg-custom-purple hover:bg-custom-purple border-custom-purple hover:border-custom-purple"
                  onClick={handleSearch}
                >
                  Cheer with BTIX
                </button>
              </div>
            </div> */}
        {/* )} */}
        {/* </div> */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <label
            tabIndex={0}
            className="px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] bg-custom-lightgrayone hover:bg-custom-lightgrayone"
          >
            <Image
              src="/icons/search.svg"
              alt="Search"
              width={18}
              height={18}
            />
          </label>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] menu px-[50px] py-5 shadow bg-custom-lightgraythree rounded-box w-[610px] flex flex-row gap-4 items-center"
          >
            <input
              type="text"
              placeholder="Search in #: @person, keyword"
              className="flex-1 bg-black border input border-custom-border text-custom-gray"
              value={searchKeyword}
              onKeyDown={handleKeywordKeydown}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              className="mr-8 btn bg-custom-default hover:bg-custom-default border-custom-default hover:border-custom-default"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        {user && <div
          className={cn(
            "px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] ",
            showPinned
              ? "bg-custom-default hover:bg-custom-default"
              : "bg-custom-lightgrayone hover:bg-custom-lightgrayone"
          )}
          onClick={togglePinned}
        >
          <Image src="/icons/pin.svg" alt="Pin" width={18} height={18} />
        </div>}
      </div>
    );
  };

  const handleChange = (e: any) => {
    setInputMessage(e.target.value);
  };

  useEffect(() => {
    if (!socket.connected && topicId) {
      const socket = io(process.env.BACKEND_URL as string);

      setSocket(socket);
    }

    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, []);

  const connectSocket = useCallback(() => {
    if (!socket?.connected) {
      socket?.connect?.();
    } else {
      console.warn("Socket already connected");
    }
  }, [socket]);
  // const handleKeydown = (e: any) => {
  //   if (e.keyCode === 13) {
  //     const date = dayjs().format("YYYY-MM-DD");
  //     let updatedChats = chatsByDate.slice();
  //     const idx = chatsByDate.findIndex((chat: any) => chat.date === date);
  //     const new_chat = {
  //       avatar: "/images/Avatar 13.png",
  //       username: "Zekken",
  //       timestamp: dayjs().format("YYYY-MM-DD hh:mm A"),
  //       content: message,
  //     };
  //     if (idx !== -1) {
  //       updatedChats[idx].chats = [...updatedChats[idx].chats, new_chat];
  //     } else {
  //       updatedChats = [
  //         ...updatedChats,
  //         {
  //           date: date,
  //           chats: [new_chat],
  //         },
  //       ];
  //     }
  //     setChatsByDate(updatedChats);
  //     setMessage("");
  //     setTimeout(() => {
  //       scrollToBottom();
  //     }, 300);
  //   }
  // };

  useEffect(() => {
    connectSocket();
  }, [topicId, connectSocket, user?._id]);

  useEffect(() => {
    console.log("useEffect Called ===================================");
    if (socket?.connected && topicId) {
      socket?.emit(
        "join_topic",
        {
          topic: topicId,
        },
        () => {
          console.log(
            "join_topic callback ================================================="
          );
        }
      );

      socket.on("joined_topic", (data) => {
        console.log(
          data,
          "data from joined topic===============================-"
        );
      });

      socket.on("newMessage", ({ data }: { data: string }) => {
        setMessages((prev) => {
          return [...prev, JSON.parse(data)];
        });
      });
    }

    return () => {
      if (socket.connected) socket.removeAllListeners();
    };
  }, [socket?.connected, topicId, user?.id]);

  return (
    <LargeCard
      title={title}
      subHeader={subHeader(groupsMembers)}
      actions={actions()}
      tags={tags}
    >
      <div className="relative max-h-[calc(100%-50px)] overflow-auto no-scrollbar">
        {messagesLoading || loading ? (
          <Loader />
        ) : (
          <ChatBody
            isNewsLetter={isNewsLetter}
            loading={false}
            topicDetails={topicDetails as ITopic}
            messages={messages}
            showPinned={showPinned}
            searchKeyword={keyword}
          />
        )}

        <div ref={messagesEndRef} />
        {!inModal && (
          <div className="sticky bottom-0 left-0 right-0 z-10 w-full bg-custom-lightgraytwo">
            <div className="mb-[6px] lg:mb-4 w-full relative">
              <input
                type="text"
                placeholder="Send A Message"
                className="input w-full bg-custom-lightgraythree border-2 border-custom-lightgraythree text-[13px] lg:text-base font-medium text-white p-[10px] h-[42px] lg:px-[25px] lg:py-[10px] hover:border-custom-purple transition ease-in-out duration-500"
                value={inputMessage}
                disabled={isNewsLetter}
                onChange={handleChange}
                onKeyDown={handleSendMessage}
              />
              <div className="text-custom-gray absolute top-0 h-[42px] right-[10px] lg:right-[25px] flex flex-col justify-center">
                <div className="h-auto p-0 min-h-fit btn btn-ghost hover:bg-transparent">
                  <Image
                    src="/icons/bowling.svg"
                    alt="Bowling"
                    width={18}
                    height={18}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex pl-1 p-2 gap-0.5 lg:gap-2 items-center">
                <Image
                  src="/icons/point1.svg"
                  alt="Transfer Icon"
                  width={12}
                  height={15}
                />
                <Image
                  src="/icons/point2.svg"
                  alt="Transfer Icon"
                  width={12}
                  height={15}
                />
                <span className="text-xs leading-[15px] lg:text-[13px] text-white">
                  Claim Your BTIX
                </span>
              </div>
              <div className="lg:hidden flex gap-[15px]">
                {!global && (
                  <div className="p-[6px] leading-[15px] min-h-fit h-auto btn text-white font-medium text-xs normal-case border-none bg-custom-purple hover:bg-custom-purple">
                    <Image
                      src="/icons/gift.svg"
                      alt="Gift"
                      width={15}
                      height={15}
                    />
                    Gift BTIX
                  </div>
                )}
                <div
                  className="p-[6px] min-h-fit h-auto btn text-white font-medium text-xs normal-case border-none bg-custom-purple hover:bg-custom-purple"
                  onClick={() => {
                    let isMember = false;
                    isMember = groupsMembers.find(
                      (item) => item.members?.[0]?._id === user?._id
                    );
                    if (isMember) {
                    } else {
                      if (user) {
                        if (global) return;
                        handleJoinUserInTopic(user?._id);
                      } else {
                        setLoginModalOpen?.(true);
                      }
                    }
                  }}
                >
                  {groupsMembers.find(
                    (item) => item.members?.[0]?._id === user?._id
                  ) || global
                    ? "Chat"
                    : "Join"}

                  {joinLoading && <FaSpinner className="animate-spin ml-2" />}
                </div>
              </div>
              <div className="hidden lg:flex gap-[15px]">
                <div className="p-[6px] lg:py-2 lg:px-3 min-h-fit h-auto btn text-white font-medium text-xs lg:text-[13px] normal-case border-none bg-custom-purple hover:bg-custom-purple">
                  <Image
                    src="/icons/gift.svg"
                    alt="Gift"
                    width={20}
                    height={20}
                  />
                  Gift BTIX
                </div>
                <div
                  className="p-[6px] lg:py-2 lg:px-3 min-h-fit h-auto btn text-white font-medium text-xs lg:text-[13px] normal-case border-none bg-custom-purple hover:bg-custom-purple"
                  onClick={() => {
                    console.log(user);

                    let isMember = false;
                    isMember = groupsMembers.find((item) => {
                      return item.members?.[0]?._id === user?._id;
                    });
                    if (isMember) {
                      router.push(
                        `?type=chat_details&id=${topicDetails?.id ?? topicId}`
                      );
                    } else {
                      if (user) {
                        if (global) {
                          return;
                        }
                        handleJoinUserInTopic(user?._id);
                      } else {
                        setLoginModalOpen?.(true);
                      }
                    }
                  }}
                >
                  {groupsMembers.find(
                    (item) => item.members?.[0]?._id === user?._id
                  ) || global
                    ? "Chat"
                    : "Join"}
                  {joinLoading && <FaSpinner className="animate-spin ml-2" />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LargeCard>
  );
}
