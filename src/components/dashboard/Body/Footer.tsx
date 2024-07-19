import Image from "next/image";

export default function Footer() {
  return (
    <div className="absolute bottom-0 w-[calc(100%+16px)] left-[-8px] right-[-8px] bg-custom-lightgraythree px-[10px]">
      <div className="p-2 lg:flex">
        <div className="bg-custom-lightgraythree p-2 rounded-[5px] flex gap-[1px]">
          <Image src="/icons/point1.svg" alt="Transfer Icon" width={12} height={15} />
          <Image src="/icons/point2.svg" alt="Transfer Icon" width={12} height={15} />
          <div className="text-[13px] text-semibold text-white ml-0.5">Claim Your BTIX</div>
        </div>
        <div className="bg-custom-lightgraythree p-2 rounded-[5px] flex gap-[1px]">
          <div className="btn bg-transparent gap-0 hover:bg-transparent border-none hover:border-none p-0 min-h-fit w-auto h-auto cursor-pointer normal-case">
            <Image src="/icons/point2.svg" alt="Transfer Icon" width={12} height={15} />
            <div className="text-[13px] text-semibold text-white ml-0.5">Referral Program</div>
          </div>
        </div>
      </div>
    </div>
  );
}
