import dayjs from "dayjs";
import Image from "next/image";
import cn from "classnames";
import { useEffect, useRef } from "react";
import Loader from "@/components/common/Loader";

function BodyItem({
  message,
  showPinned,
  searchKeyword,
}: {
  message: IMessage;
  showPinned: boolean;
  searchKeyword: string;
}) {
  // const content = searchKeyword
  //   ? chat.mainDescription.replaceAll(
  //       searchKeyword,
  //       `<span style="background-color: rgba(59, 130, 246, 0.8)">${searchKeyword}</span>`
  //     )
  //   : chat.mainDescription;
  return (
    <div className={cn(false ? "bg-custom-purple/40" : "", "mb-[20px] lg:mb-[25px] flex gap-2")}>
      <div className="lg:hidden w-[27px] h-[27px] rounded-full overflow-hidden">
        <Image
          src={message?.sender?.profileImageUrl ?? "https://picsum.photos/200/200"}
          alt="Light Green NFT"
          width={27}
          height={27}
        />
      </div>
      <div className="hidden lg:block w-[30px] h-[30px] rounded-full overflow-hidden">
        <Image
          src={message?.sender?.profileImageUrl ?? "https://picsum.photos/200/200"}
          alt="Light Green NFT"
          width={27}
          height={27}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center py-[1.5px] lg:py-[3px]">
          <span className="text-[13px] lg:text-base text-custom-sky">
            {(message?.sender?.displayName as string) ?? (message?.sender?.userName as string)}
          </span>
          <span className="text-[11px] text-custom-darkgraytwo ml-2">
            {dayjs(message?.createdAt).format("hh:mm A")}
          </span>
        </div>
        <div
          className="text-custom-darkgrayfour text-[13px]"
          dangerouslySetInnerHTML={{ __html: message.context }}
        ></div>
      </div>
    </div>
  );
}

export default function ChatBody({
  topicDetails,
  showPinned,
  loading,
  isNewsLetter,
  messages,
  searchKeyword,
}: {
  topicDetails: ITopic;
  messages: IMessage[];
  loading: boolean;
  isNewsLetter: boolean;
  showPinned: boolean;
  searchKeyword: string;
}) {
  // const { currentMessages, messagesLoader } = useChatSelector();
  // const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   if (topicDetails?._id) dispatch(getMessagesByTopicIdAsync(topicDetails?._id));
  // }, [topicDetails, dispatch]);

  let currentDate = "";

  return (
    <>
      {isNewsLetter ? (
        <div>
          <div className="flex items-center mb-[20px] lg:mb-[25px]">
            <div className="h-[1px] flex-1 bg-custom-border"></div>
            <div className="px-[10px] border border-custom-border rounded-[5px] text-custom-darkgraytwo text-[11px]">
              {dayjs(topicDetails?.createdAt).format("MM/DD/YYYY")}
            </div>
            <div className="h-[1px] flex-1 bg-custom-border"></div>
          </div>
          <BodyItem
            key={topicDetails._id}
            showPinned={showPinned}
            message={{
              context: topicDetails?.mainDescription,
              _id: topicDetails._id,
              createdAt: topicDetails?.createdAt,
              sender: {
                id: topicDetails?.createdBy?.[0]?._id,
                userName: topicDetails?.createdBy?.[0]?.userName,
                displayName: topicDetails?.createdBy?.[0]?.displayName,
                profileImageUrl: topicDetails?.createdBy?.[0]?.profileImageUrl,
              },
            }}
            searchKeyword={searchKeyword}
          />
        </div>
      ) : (
        <>
          {messages?.map((message: IMessage) => {
            if (currentDate !== dayjs(message?.createdAt).format("MM/DD/YYYY")) {
              currentDate = dayjs(message?.createdAt).format("MM/DD/YYYY");

              return (
                <div key={message._id}>
                  <div className="flex items-center mb-[20px] lg:mb-[25px]">
                    <div className="h-[1px] flex-1 bg-custom-border"></div>
                    <div className="px-[10px] border border-custom-border rounded-[5px] text-custom-darkgraytwo text-[11px]">
                      {dayjs(message?.createdAt).format("MM/DD/YYYY")}
                    </div>
                    <div className="h-[1px] flex-1 bg-custom-border"></div>
                  </div>
                  <BodyItem
                    key={message._id}
                    showPinned={showPinned}
                    message={message}
                    searchKeyword={searchKeyword}
                  />
                </div>
              );
            } else {
              return (
                <div key={message._id}>
                  <BodyItem
                    key={message._id}
                    showPinned={showPinned}
                    message={message}
                    searchKeyword={searchKeyword}
                  />
                </div>
              );
            }
          })}
        </>
      )}

      {loading && <Loader />}

      <div ref={scrollRef} />
    </>
  );
}
