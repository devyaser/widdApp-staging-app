import Image from "next/image";
import * as Yup from "yup";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const VerifyAccountSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
});

const links = [
  {
    id: 1,
    type: "chat",
    content: "consectetur adipiscing elit.",
    category: "trending",
  },
  {
    id: 1,
    type: "chat",
    content: "consectetur adipiscing elit.",
    category: "trending",
  },
  {
    id: 1,
    type: "keyword",
    content: "What is a wallet?",
    category: "knowledge",
  },
  { id: 2, type: "person", content: "Gorem ipsum", category: "trending" },
  { id: 1, type: "person", content: "Gorim ipsum", category: "popular" },
  {
    id: 2,
    type: "chat",
    content: "One-third of humanity remains offline",
    category: "popular",
  },
  {
    id: 2,
    type: "chat",
    content: "One-third of humanity remains offline",
    category: "popular",
  },
];

function Link({
  type,
  content,
  handleClick,
}: {
  type: string;
  content: string;
  handleClick: Function;
}) {
  switch (type) {
    case "chat":
      return (
        <div
          className="cursor-pointer text-base font-medium leading-5 text-custom-default"
          onClick={() => handleClick()}
        >
          #{content}
        </div>
      );
    case "person":
      return (
        <div
          className="cursor-pointer text-base font-medium leading-5 text-custom-sky"
          onClick={() => handleClick()}
        >
          @{content}
        </div>
      );
    default:
      return (
        <div
          className="cursor-pointer text-base font-medium leading-5 text-custom-purple"
          onClick={() => handleClick()}
        >
          {content}
        </div>
      );
  }
}

export default function SearchModal({
  open,
  hideModal,
  handleClickLink,
}: {
  open: boolean;
  hideModal: Function;
  handleClickLink: Function;
}) {
  const [filtedLinks, setFiltedLinks] = useState<any>([]);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("keyword");
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const search = type === "keyword" ? keyword : keyword.slice(1);
    setFiltedLinks(
      links.filter(
        (link) =>
          link.content.toLowerCase().indexOf(search.toLowerCase()) !== -1 &&
          (link.type === type || type === "keyword") &&
          (categories.length === 0 || categories.indexOf(link.category) !== -1)
      )
    );
  }, [keyword, type, categories]);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (e.target.value.indexOf("#") !== -1) {
      setType("chat");
    } else if (e.target.value.indexOf("@") !== -1) {
      setType("person");
    } else {
      setType("keyword");
    }
  };

  const handleCategory = (category: string) => {
    if (categories.indexOf(category) !== -1) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  return (
    <div
      className={cn(
        "modal bg-custom-lightgraythree/90",
        open ? "modal-open" : "invisible"
      )}
    >
      <div className="modal-box p-5 max-h-fit rounded-none w-full h-full lg:max-h-[calc(100vh-5em)] lg:rounded lg:px-2 lg:pt-[30px] lg:pb-[90px] bg-custom-lightgraytwo no-scrollbar max-w-[700px]">
        <div className="flex justify-end mb-5">
          <button
            className="lg:hidden btn h-auto p-0 min-h-fit font-normal btn-ghost text-white"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            <Image
              src="/icons/close-mobile.svg"
              width={25}
              height={25}
              alt="Close"
            />
          </button>
          <button
            className="hidden lg:block mr-8 btn h-auto p-0 min-h-fit font-normal btn-ghost text-white"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            <Image
              src="/icons/close-mobile.svg"
              width={40}
              height={40}
              alt="Close"
            />
          </button>
        </div>
        <div className="w-full lg:w-[580px] m-auto">
          <div className="flex lg:justify-end mt-10 mb-[17px] lg:mb-2">
            <div className="flex">
              <div className="flex gap-0.5">
                <Image
                  src="/icons/point2.svg"
                  alt="Transfer Icon"
                  width={12}
                  height={15}
                />
                <span className="text-[13px] font-medium text-white">
                  Referral Program
                </span>
              </div>
            </div>
          </div>
          <div className="mb-[17px] lg:mb-5">
            <input
              type="text"
              placeholder="Search @person, #chat or keyword"
              className="search-input text-base font-medium lg:text-xl input px-[15px] py-5 lg:px-[25px] lg:py-2 search-input w-full bg-black border border-custom-border text-white"
              value={keyword}
              onChange={handleKeywordChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap mb-[17px] lg:mb-0">
            <button
              className={cn(
                "btn px-4 py-2 min-h-fit h-[32px] normal-case text-xs font-normal text-white border-none rounded-[12px]",
                categories.indexOf("trending") !== -1
                  ? "bg-custom-default hover:bg-custom-default"
                  : "bg-custom-lightgrayone hover:bg-custom-lightgrayone"
              )}
              onClick={() => handleCategory("trending")}
            >
              Trending Topic
            </button>
            <button
              className={cn(
                "btn px-4 py-2 min-h-fit h-[32px] normal-case text-xs font-normal text-white border-none rounded-[12px]",
                categories.indexOf("knowledge") !== -1
                  ? "bg-custom-default hover:bg-custom-default"
                  : "bg-custom-lightgrayone hover:bg-custom-lightgrayone"
              )}
              onClick={() => handleCategory("knowledge")}
            >
              Knowledge Based
            </button>
            <button
              className={cn(
                "btn px-4 py-2 min-h-fit h-[32px] normal-case text-xs font-normal text-white border-none rounded-[12px]",
                categories.indexOf("popular") !== -1
                  ? "bg-custom-default hover:bg-custom-default"
                  : "bg-custom-lightgrayone hover:bg-custom-lightgrayone"
              )}
              onClick={() => handleCategory("popular")}
            >
              Popular
            </button>
          </div>
          <div className="hidden lg:block bg-custom-border my-5 h-[1px] w-full"></div>
          <div className="flex flex-col gap-[7px]">
            {filtedLinks.map((link: any, idx: number) => (
              <Link
                key={idx}
                type={link.type}
                content={link.content}
                handleClick={() =>
                  handleClickLink(link.type, link.category, link.id)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
