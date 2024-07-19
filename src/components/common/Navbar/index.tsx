import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="lg:flex flex-col border-r border-custom-border w-auto h-full px-5 py-[25px] space-y-6 hidden">
      <a tabIndex={0} href="https://botnex.botrix.io" target="_blank" className="h-[85px]">
        <div className="btn btn-ghost w-auto h-auto btn-circle">
          <Image src="/images/download-1.png" width={85} height={85} alt="Logo" />
        </div>
      </a>
      <div className="btn btn-ghost w-auto h-auto btn-circle">
        <Image src="/images/download-4.png" width={85} height={85} alt="Logo" />
      </div>
      <Link href="/buy">
        <div className="btn btn-ghost w-auto h-auto btn-circle">
          <Image src="/images/download-5.png" width={85} height={85} alt="Logo" />
        </div>
      </Link>
    </div>
  );
}
