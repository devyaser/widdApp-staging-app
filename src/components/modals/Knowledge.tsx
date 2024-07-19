import Image from "next/image";
import clsx from "classnames";
import { useRouter } from "next/router";

const knowledges = [{ id: 1, path: "/images/knowledge/Understanding Web3.jpg" }];

export default function KnowledgeModal({
  open,
  hideModal,
  id,
}: {
  open: boolean;
  hideModal: Function;
  id: number;
}) {
  const knowledge = knowledges.find((knowledge) => knowledge.id === id) || knowledges[0];

  return (
    <div className={clsx("modal bg-custom-lightgraythree/90", open ? "modal-open" : "invisible")}>
      <div className="modal-box p-5 max-h-fit rounded-none w-full h-full lg:max-h-[calc(100vh-5em)] lg:rounded lg:px-2 lg:pt-[30px] lg:pb-[90px] bg-custom-lightgraytwo no-scrollbar lg:max-w-[700px]">
        <div className="flex justify-end mb-5">
          <button
            className="lg:hidden btn h-auto p-0 min-h-fit font-normal btn-ghost text-white"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            <Image src="/icons/close-mobile.svg" width={25} height={25} alt="Close" />
          </button>
          <button
            className="hidden lg:block mr-8 btn h-auto p-0 min-h-fit font-normal btn-ghost text-white"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            <Image src="/icons/close-mobile.svg" width={40} height={40} alt="Close" />
          </button>
        </div>
        <div className="w-full lg:w-[580px] m-auto mt-10">
          <Image src={knowledge.path} width={650} height={800} alt="knowledge" />
        </div>
      </div>
    </div>
  );
}
