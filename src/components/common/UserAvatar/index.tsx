import Image from "next/image";
import React from "react";

const UserAvatar = ({ src, username }: { src: string; username: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[33px] h-[33px] rounded-full overflow-hidden">
        <Image src={src} alt="Transfer Icon" width={33} height={33} />
      </div>
      <div className="w-auto lg:w-[80px] text-sm font-bold text-custom-sky">
        {username}
      </div>
    </div>
  );
};

export default UserAvatar;
