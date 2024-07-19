import Image from "next/image";
import Layout from "../Layout";

export default function ClickableCard({
  title,
  children,
  handleClick,
}: {
  title: string;
  children?: any;
  handleClick: Function;
}) {
  return (
    <div className="border-b border-custom-border px-2 py-4">
      <div className="flex pt-0 p-2 gap-2">
        <div className="text-sm font-bold text-custom-darkgraythree uppercase">{title}</div>
        <div className="btn btn-ghost p-0 h-auto min-h-fit" onClick={() => handleClick()}>
          <Image src="/icons/transfer-data.svg" alt="Transfer Icon" width={16} height={16} />
        </div>
      </div>
      {children}
    </div>
  );
}
