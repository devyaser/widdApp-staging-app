import Tag from "../../../common/Tag";
import Image from "next/image";
export default function NftItem({
  avatar,
  handleClick,
  tags = [],
}: {
  avatar: string;
  chatLink: string;
  handleClick: () => void;
  tags?: string[];
}) {
  return (
    <div className="text-white bg-custom-lightgrayone mx-auto sm:mx-0 max-w-[266px] rounded-md">
      <div>
        <Image
          src={avatar}
          alt="banner image"
          layout="responsive"
          width={1000}
          height={700}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-end gap-2">
          {tags.map((item, i) => (
            <Tag key={i} text={item} />
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <div className="text-xl font-semibold">Chat</div>
          <div
            className="text-xs font-medium mt-1"
            onClick={handleClick}
            role="button"
          >
            Chat link
          </div>
        </div>
      </div>
    </div>
  );
}
