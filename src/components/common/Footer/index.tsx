import Image from "next/image";
import { useSession, signOut } from "next-auth/client";
import Link from "next/link";

export default function Footer() {
  const [session] = useSession();

  const handleSignout = () => {
    signOut({ redirect: false });
  };

  return (
    <div className="fixed bottom-0 w-full left-0 lg:hidden bg-custom-lightgraythree h-[56px] z-10 flex gap-2 items-center justify-center border-t border-custom-border">
      {/* <a
        className="btn btn-ghost min-h-fit h-auto w-[42px] border-none btn-circle"
        href="https://bscscan.com/address/0x623951826f6E5D397CC484b829974d3c8db597d0"
        target="_blank"
      >
        <Image src="/images/Isolation_Mode.png" width={42} height={42} alt="Logo" />
      </a> */}
      <div className="btn min-h-fit h-auto w-[42px] border-none btn-ghost btn-circle">
        {!session ? (
          <Image src="/images/chat.png" width={42} height={42} alt="Chat" />
        ) : (
          <Link href="?type=person&username=torem">
            <Image
              src="/images/user-initial.png"
              width={42}
              height={42}
              alt="Chat"
            />
          </Link>
        )}
      </div>
      {/* <div className="btn min-h-fit h-auto w-[42px] border-none btn-ghost btn-circle">
        <Image src="/images/notification.png" width={42} height={42} alt="Notification" />
      </div> */}
      <a tabIndex={0} href="https://botnex.botrix.io" target="_blank" className="flex">
        <div className="btn min-h-fit h-auto w-[42px] border-none btn-ghost btn-circle avatar rounded-full">
          <Image
            src="/images/account_circle.png"
            width={42}
            height={42}
            alt="Logo"
          />
        </div>
      </a>
    </div>
  );
}
