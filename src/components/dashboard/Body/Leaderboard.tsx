import LargeCard from "../../common/LargeCard";
import ChatItem from "./ChatItem";
import { useRouter } from "next/router";
import Image from "next/image";
import { mock_chats } from "../../../mock-data";
import Footer from "./Footer";
import BoardItem from "./BoardItem";

export default function PinnedChats() {
  const router = useRouter();

  const handleClick = (username: string) => {
    router.push(`?type=person&username=${username}`);
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
            <Image src="/icons/sort-one.svg" alt="Sort One" width={18} height={18} />
          </label>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-custom-lightgraythree rounded-box w-[380px] lg:w-[620px] flex flex-row justify-end gap-1 items-center"
          >
            <div className="text-sm font-bold text-white px-3">Sort by</div>
            <div className="bg-custom-lightgrayone rounded-[5px] px-3 py-2">
              <div className="text-[13px] font-medium text-white">Users</div>
            </div>
            <div className="bg-custom-lightgrayone rounded-[5px] px-3 py-2">
              <div className="text-[13px] font-medium text-white">Newest Chats</div>
            </div>
            <div className="bg-custom-lightgrayone rounded-[5px] px-3 py-2">
              <div className="text-[13px] font-medium text-white">Newest Replies</div>
            </div>
            <div className="bg-custom-lightgrayone rounded-[5px] px-3 py-2">
              <div className="text-[13px] font-medium text-white">Most Cheered</div>
            </div>
            <div className="bg-custom-lightgrayone rounded-[5px] px-3 py-2">
              <div className="text-[13px] font-medium text-white">Most Pinned</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <LargeCard
      title="Leaderboards"
      subHeader={null}
      symbol="@"
      actions={actions()}
      close
      handleClose={handleClose}
    >
      <div className="relative max-h-[calc(100%-100px)] overflow-auto no-scrollbar space-y-1 pb-[70px]">
        <table className="table">
          <thead className="invisible">
            <tr className="border-none">
              <th className="lg:hidden w-[100px]"></th>
              <th className="w-[200px]"></th>
              <th className="hidden lg:block"></th>
              <th className="w-[200px]"></th>
            </tr>
          </thead>
          <tbody>
            {mock_chats.map((chat: any, idx: number) => (
              <BoardItem
                key={idx}
                idx={idx + 1}
                title={chat.title}
                avatar={chat.avatar}
                username={chat.username}
                handleClick={() => handleClick(chat.username)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </LargeCard>
  );
}
