import cn from "classnames";
import Pill from "./../../../../components/common/Pill";
import UserAvatar from "./../../../../components/common/UserAvatar";
import dayjs from "dayjs";

export default function TopicItem({
  title,
  avatar,
  username,
  me = false,
  handleClick,
  createdAt,
  pinned = false,
  tags = [],
}: {
  title: string;
  avatar: string;
  username: string;
  me?: boolean;
  handleClick: Function;
  pinned?: boolean;
  createdAt?: string;
  tags?: string[];
}) {
  return (
    <div
      className={cn(
        "py-[10px] px-2 lg:px-5 flex flex-col lg:flex-row lg:items-center justify-between gap-2 overflow-hidden cursor-pointer",
        pinned ? "bg-custom-graytwo rounded-[5px]" : "border-b border-custom-border"
      )}
      onClick={() => handleClick()}
    >
      <div className="flex items-center flex-1 gap-1">
        <div className="flex gap-1">
          {tags.length > 0 && tags.map((item, indx) => <Pill key={indx} title={item} />)}
        </div>
        <div className="text-sm text-white text-bold">{title}&nbsp;</div>
      </div>
      <div className="flex items-center ">
        <UserAvatar src={avatar} username={username} />
        <div className="hidden lg:block text-[11px] text-custom-darkgraytwo">
          {dayjs(createdAt).format("MM/DD/YYYY HH:mm")}
        </div>
        <div className="lg:hidden text-[11px] text-custom-darkgraytwo">05/21/2023</div>
      </div>
    </div>
  );
}
