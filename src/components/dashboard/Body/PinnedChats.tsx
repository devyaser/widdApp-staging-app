import LargeCard from "../../../components/common/LargeCard";
import { useRouter } from "next/router";
import Image from "next/image";
import Footer from "./Footer";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setPinnedTopics,
  useTopicsSelector,
} from "store/features/topics/topics";
import { getAllPinnedTopics } from "services/topics.services";
import { FaSpinner } from "react-icons/fa";
import dayjs from "dayjs";

export function PinnedTopicItem({
  title,
  avatar,
  username,
  me = false,
  handleClick,
  createdAt,
}: {
  title: string;
  avatar: string;
  username: string;
  me?: boolean;
  handleClick: Function;
  createdAt: string;
}) {
  return (
    <div
      className={cn(
        "py-[10px] pr-5 pl-2 flex items-center justify-between overflow-hidden cursor-pointer",
        "bg-custom-graytwo rounded-[5px]"
      )}
      onClick={() => handleClick()}
    >
      <div>
        <div className="flex items-center">
          <span className="w-5 mx-2 leading-9 text-[30px] text-custom-gray text-bold">
            #
          </span>
          <div className="text-sm text-bold text-white">{title}&nbsp;</div>
        </div>
        <div className="ml-9 flex gap-2 items-center">
          {!me ? (
            <>
              <div className="w-[33px] h-[33px] rounded-full overflow-hidden">
                <Image
                  src={avatar || ""}
                  alt="Transfer Icon"
                  width={33}
                  height={33}
                />
              </div>
              <div className="w-auto lg:w-[143px] text-sm font-bold text-custom-sky">
                {username}
              </div>
            </>
          ) : null}

          <div className="hidden lg:block text-[11px] text-custom-darkgraytwo">
            {dayjs(createdAt)?.format("MM/DD/YYYY")}
          </div>
          <div className="lg:hidden text-[11px] text-custom-darkgraytwo">
            {dayjs(createdAt)?.format("MM/DD/YYYY")}
          </div>
          {/* <div className="lg:hidden bg-custom-lightgraythree px-3 py-1 lg:py-2 rounded-[5px] flex gap-[1px]">
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
            <div className="text-[13px] text-semibold text-white ml-0.5">
              1000
            </div>
          </div> */}
          {/* <div className="lg:hidden bg-custom-lightgraythree px-3 py-1 lg:py-2 rounded-[5px] flex items-center gap-[1px]">
            <div>
              <Image
                src="/images/user-to-user-transmission.png"
                alt="Transmission"
                width={16}
                height={16}
              />
            </div>
            <div className="text-[13px] text-semibold text-white ml-0.5">
              346
            </div>
          </div> */}
        </div>
      </div>
      {/* <div className="hidden lg:flex gap-1">
        <div className="bg-custom-lightgraythree px-3 py-2 rounded-[5px] flex gap-[1px]">
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
          <div className="text-[13px] text-semibold text-white ml-0.5">
            1000
          </div>
        </div>
        <div className="bg-custom-lightgraythree px-3 py-2 rounded-[5px] flex gap-[1px]">
          <Image
            src="/images/user-to-user-transmission.png"
            alt="Transmission"
            width={16}
            height={16}
          />
          <div className="text-[13px] text-semibold text-white ml-0.5">346</div>
        </div>
      </div> */}
    </div>
  );
}

export default function PinnedChats() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { pinnedTopics } = useTopicsSelector();
  const [pagination] = useState<IPagination>({
    page: 1,
    pageSize: 100,
  });

  const handleClick = (id: string) => {
    router.push(`?type=dao_details&id=${id}`);
  };

  const handleClose = () => {
    router.back();
  };

  const actions = () => {
    return (
      <>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label
            tabIndex={0}
            className="px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] bg-custom-lightgrayone hover:bg-custom-lightgrayone"
          >
            <Image
              src="/icons/sort-one.svg"
              alt="Sort One"
              width={18}
              height={18}
            />
          </label>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-custom-lightgraythree rounded-box w-[380px] lg:w-[620px] flex flex-row justify-end gap-1 items-center"
          >
            <div className="text-sm font-bold text-white pr-2 lg:px-3">
              Sort by
            </div>
            <div className="bg-custom-lightgrayone rounded-[5px] px-3 py-2">
              <div className="text-[13px] font-medium text-white">Users</div>
            </div>
            <div className="bg-custom-lightgrayone rounded-[5px] px-3 py-2">
              <div className="text-[13px] font-medium text-white">
                Newest Chats
              </div>
            </div>
            <div className="bg-custom-lightgrayone rounded-[5px] px-3 py-2">
              <div className="text-[13px] font-medium text-white">
                Newest Replies
              </div>
            </div>
            <div className="bg-custom-lightgrayone rounded-[5px] px-3 py-2">
              <div className="text-[13px] font-medium text-white">
                Most Cheered
              </div>
            </div>
            <div className="bg-custom-lightgrayone rounded-[5px] px-3 py-2">
              <div className="text-[13px] font-medium text-white">
                Most Pinned
              </div>
            </div>
          </div>
        </div>
      </>
    );
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
    <LargeCard
      title="Pinned Topics"
      subHeader={null}
      actions={null}
      close
      handleClose={handleClose}
    >
      <div className="relative max-h-[calc(100%-100px)] overflow-auto no-scrollbar space-y-1 pb-[70px] mt-2">
        {loading ? (
          <div className="flex items-center justify-center">
            <FaSpinner className="animate-spin transition duration-1000" />
          </div>
        ) : pinnedTopics?.length > 0 ? (
          pinnedTopics?.map((topic: any, idx: number) => {
            return (
              <PinnedTopicItem
                key={idx}
                title={topic?.topicName}
                avatar={topic?.createdBy?.profileImageUrl}
                username={
                  topic?.createdBy?.displayName || topic?.createdBy?.username
                }
                createdAt={topic?.createdAt}
                handleClick={() => handleClick(topic?._id)}
              />
            );
          })
        ) : (
          <div className="bg-custom-lightgrayone py-[10px] pr-5 pl-2 flex items-center justify-center w-full gap-2 rounded-[5px] overflow-hidden">
            <p className="text-custom-hash text-sm">No Pinned Topics!</p>
          </div>
        )}
      </div>
      <Footer />
    </LargeCard>
  );
}
