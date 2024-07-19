import Image from "next/image";
import cn from "classnames";

export default function ChatItem({
  title,
  avatar,
  username,
  me = false,
  handleClick,
  pinned = false,
}: {
  title: string;
  avatar: string;
  username: string;
  me?: boolean;
  handleClick: Function;
  pinned?: boolean;
}) {
  return (
    <div
      className={cn(
        "py-[10px] pr-5 pl-2 flex items-center justify-between overflow-hidden cursor-pointer",
        pinned ? "bg-custom-graytwo rounded-[5px]" : "border-b border-custom-border"
      )}
      onClick={() => handleClick()}
    >
      <div>
        <div className="flex items-center">
          <span className="w-5 mx-2 leading-9 text-[30px] text-custom-gray text-bold">#</span>
          <div className="text-sm text-bold text-white">{title}&nbsp;</div>
        </div>
        <div className="ml-9 flex gap-2 items-center">
          {!me ? (
            <>
              <div className="w-[33px] h-[33px] rounded-full overflow-hidden">
                <Image src={avatar} alt="Transfer Icon" width={33} height={33} />
              </div>
              <div className="w-auto lg:w-[143px] text-sm font-bold text-custom-sky">
                {username}
              </div>
            </>
          ) : null}

          <div className="hidden lg:block text-[11px] text-custom-darkgraytwo">
            05/21/2023 5:45 AM
          </div>
          <div className="lg:hidden text-[11px] text-custom-darkgraytwo">05/21/2023</div>
          <div className="lg:hidden bg-custom-lightgraythree px-3 py-1 lg:py-2 rounded-[5px] flex gap-[1px]">
            <Image src="/icons/point1.svg" alt="Transfer Icon" width={12} height={15} />
            <Image src="/icons/point2.svg" alt="Transfer Icon" width={12} height={15} />
            <div className="text-[13px] text-semibold text-white ml-0.5">1000</div>
          </div>
          <div className="lg:hidden bg-custom-lightgraythree px-3 py-1 lg:py-2 rounded-[5px] flex items-center gap-[1px]">
            <div>
              <Image
                src="/images/user-to-user-transmission.png"
                alt="Transmission"
                width={16}
                height={16}
              />
            </div>
            <div className="text-[13px] text-semibold text-white ml-0.5">346</div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex gap-1">
        <div className="bg-custom-lightgraythree px-3 py-2 rounded-[5px] flex gap-[1px]">
          <Image src="/icons/point1.svg" alt="Transfer Icon" width={12} height={15} />
          <Image src="/icons/point2.svg" alt="Transfer Icon" width={12} height={15} />
          <div className="text-[13px] text-semibold text-white ml-0.5">1000</div>
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
      </div>
    </div>
  );
}
