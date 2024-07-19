import Image from "next/image";
import clsx from "classnames";

export default function WalletQRModal({
  open,
  hideModal,
}: {
  open: boolean;
  hideModal: Function;
}) {
  return (
    <div
      className={clsx(
        "modal bg-custom-lightgraythree/90",
        open ? "modal-open" : "invisible"
      )}
    >
      <div className="modal-box px-2 pt-[30px] pb-[90px] bg-custom-lightgraytwo no-scrollbar max-w-[700px]">
        <div className="flex justify-end mb-5 mr-[30px]">
          <button
            className="btn btn-sm min-h-fit font-normal btn-circle btn-ghost text-white text-[48px]"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            ✕
          </button>
        </div>
        <div className="w-[580px] m-auto mt-10 flex justify-center">
          <div className="w-[370px]">
            <div className="mb-2">
              <Image
                src="/images/logo.png"
                width={255}
                height={72}
                alt="Logo"
              />
            </div>
            <div className="py-5 px-2">
              <div className="text-[20px] font-bold text-white mb-2">
                Connect Wallet
              </div>
              <div className="text-base text-white">
                Botrix use Binance BNB Wallet
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/wallet.png"
                  width={240}
                  height={350}
                  alt="wallet"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
