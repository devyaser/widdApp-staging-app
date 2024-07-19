import dayjs from "dayjs";
import Tag from "../../../common/Tag";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DaoItem({
  setLoginModalOpen,
  avatar,
  title,
  description,
  createdAt,
  handleClick,
  isJoined,
  isOwned,
  isPrivate,
}: {
  setLoginModalOpen?: (value: boolean) => void;
  avatar: string;
  title: string;
  description: string;
  handleClick: () => void;
  createdAt?: string;
  uploadedImages?: string[];
  isJoined?: boolean;
  isOwned?: boolean;
  isPrivate?: boolean;
}) {
  const [slicedDescription, setSlicedDescription] = useState("");

  useEffect(() => {
    const fullDescription = new DOMParser().parseFromString(
      description,
      "text/html"
    );
    if (fullDescription) {
      for (let i = 0; i < fullDescription.querySelectorAll("p").length; i++) {
        const element = fullDescription.querySelectorAll("p")[i];
        if (
          element?.textContent?.length &&
          !element?.textContent.startsWith("<img")
        ) {
          setSlicedDescription(element?.textContent as string);
          break;
        }
      }
    }
  }, [description]);
  return (
    <div
      className="text-white bg-custom-lightgrayone max-w-[266px] mx-auto sm:mx-0  rounded-md cursor-pointer"
      onClick={handleClick}
    >
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
          {!isOwned && isJoined && <Tag text={"Joined"} variant="success" />}
          {isOwned && <Tag text={"Owned"} variant="success" />}
          <Tag text={isPrivate ? "Private": "Public"} variant="success" />
          <Tag text={dayjs(createdAt).format("MM/DD/YYYY")} variant="success" />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-xl font-semibold line-clamp-2">{title}</div>
          <div
            className="mt-1 text-xs font-medium line-clamp-3"
            dangerouslySetInnerHTML={{ __html: slicedDescription }}
          />
        </div>
      </div>
    </div>
  );
}
