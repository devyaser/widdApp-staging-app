import UserAvatar from "../../../common/UserAvatar";
import DateContainer from "../../../common/DateContainer";
import dayjs from "dayjs";

export default function ChatTopicItem({
  avatar,
  title,
  username,
  handleClick,
  createdAt,
  tags = [],
}: {
  avatar: string;
  title: string;
  username: string;
  handleClick: () => void;
  createdAt?: string;
  tags?: string[];
}) {
  return (
    <div
      className="text-white bg-custom-lightgrayone rounded-md px-5 py-[10px] cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex gap-2 ">
        <div className="mt-5 text-4xl font-bold text-custom-darkgraythree">
          #
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-sm font-semibold line-clamp-3">{title}</div>
          <UserAvatar src={avatar} username={username} />
          <DateContainer date={dayjs(createdAt).format("MM/DD/YYYY HH:mm")} />
        </div>
      </div>
    </div>
  );
}
