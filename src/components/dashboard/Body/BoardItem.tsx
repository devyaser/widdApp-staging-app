import Image from "next/image";

export default function BoardItem({
  idx,
  title,
  avatar,
  username,
  me = false,
  handleClick,
}: {
  idx: number;
  title: string;
  avatar: string;
  username: string;
  me?: boolean;
  handleClick: Function;
}) {
  const showMedal = () => {
    let medal = null;
    switch (idx) {
      case 1:
        medal = (
          <Image
            src="/images/gold-medal.png"
            alt="Gold Medal"
            width={20}
            height={20}
          />
        );
        break;

      case 2:
        medal = (
          <Image
            src="/images/gold-medal-2.png"
            alt="Gold Medal"
            width={20}
            height={20}
          />
        );
        break;

      case 3:
        medal = (
          <Image
            src="/images/gold-medal-3.png"
            alt="Gold Medal"
            width={20}
            height={20}
          />
        );
        break;

      default:
        break;
    }
    return medal;
  };

  return (
    <tr
      className="rounded-[5px] overflow-hidden cursor-pointer"
      onClick={() => handleClick()}
    >
      <td className="lg:hidden p-0 border-b border-custom-border pr-2">
        <div className="flex justify-end">{showMedal()}</div>
      </td>
      <td className="py-5 px-0 border-b border-custom-border">
        <div className="ml-0 lg:ml-9 flex gap-2 items-center">
          <div className="rounded-full overflow-hidden">
            <Image src={avatar} alt="Transfer Icon" width={33} height={33} />
          </div>
          <div className="w-auto lg:w-[143px] text-sm font-bold text-custom-sky">
            {username}
          </div>
        </div>
      </td>
      <td className="hidden lg:table-cell p-0 border-b border-custom-border">
        {showMedal()}
      </td>
      <td className="p-0 border-b border-custom-border">
        <div className="flex gap-1">
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
            <div className="text-[13px] text-semibold text-white ml-0.5">
              346
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
