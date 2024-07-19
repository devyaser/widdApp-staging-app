import cn from "classnames";
import Pill from "@/components/common/Pill";
import Button from "@/components/common/Button";
import dayjs from "dayjs";

export default function TopicItem({
  title,
  createdAt,
  handleEdit,
  handleEnd,
  handleClick,
  pinned = false,
  tags = [],
}: {
  title: string;
  avatar: string;
  createdAt: string;
  username: string;
  handleClick: Function;
  handleEdit: Function;
  handleEnd: Function;
  pinned?: boolean;
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
      <div className="flex flex-1  gap-1 items-center">
        <div className="flex gap-1">
          {tags.length > 0 && tags.map((item, indx) => <Pill key={indx} title={item} />)}
        </div>
        <div className="text-sm text-bold text-white">{title}&nbsp;</div>
      </div>
      <div className="flex  items-center justify-end gap-2 lg:gap-8">
        <div className="hidden lg:block text-[11px] text-custom-darkgraytwo">
          {dayjs(createdAt)?.format("MM/DD/YYYY")}
        </div>
        <div className="lg:hidden text-[11px] text-custom-darkgraytwo">05/21/2023</div>
        <div className="flex gap-2 lg:gap-4">
          <Button variant="dark" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="dark" onClick={handleEnd}>
            End
          </Button>
        </div>
      </div>
    </div>
  );
}
