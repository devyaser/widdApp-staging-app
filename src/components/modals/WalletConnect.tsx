import Image from "next/image";
import clsx from "classnames";
import { useRouter } from "next/router";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

const knowledges = [
  { id: 1, path: "/images/knowledge/Understanding Web3.jpg" },
];

export default function WalletConnectModal({
  open,
  hideModal,
  handleConnectWallet,
}: {
  open: boolean;
  hideModal: Function;
  handleConnectWallet: Function;
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
            <div className="mb-2 bg-custom-lightgraythree px-4 py-5 rounded-[5px]">
              <div className="text-[20px] font-bold text-white mb-2">
                Order Details
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <div className="mr-2">
                    <Image
                      src="/images/avatar-1.png"
                      width={30}
                      height={30}
                      alt="Logo"
                    />
                  </div>
                  <div className="text-base text-white">
                    <span className="text-custom-sub">Tier 3 Access</span>
                    <br />
                    <span className="font-bold">BOT: 115XT</span>
                  </div>
                </div>
                <div className="text-base text-white">
                  <span>25 BNB</span>
                  <br />
                  <span className="text-custom-sub">$50.00</span>
                </div>
              </div>
            </div>
            <div className="mb-2 bg-custom-lightgraythree px-4 py-5 rounded-[5px]">
              <div className="text-[20px] font-bold text-white mb-2">
                Order Summary
              </div>
              <div className="flex justify-between py-2">
                <div className="text-custom-sub">Subtotal</div>
                <div className="text-base text-white">
                  25 BNB, <span className="text-custom-sub">$50.00</span>
                </div>
              </div>
              <div className="flex justify-between py-2">
                <div className="text-white">Total</div>
                <div className="text-base text-white">
                  25 BNB, <span className="text-custom-sub">$50.00</span>
                </div>
              </div>
              {/* <CrossmintPayButton
                projectId="_YOUR_PROJECT_ID_"
                collectionId="_YOUR_COLLECTION_ID_"
                environment="_ENVIRONMENT_"
                mintConfig={{
                  type: "erc-721",
                  quantity: "_NUMBER_OF_NFTS_",
                  totalPrice: "_PRICE_IN_NATIVE_TOKEN_",
                  // your custom minting arguments...
                }}
                className="w-full mb-2"
              /> */}
              <button
                className="btn w-full flex normal-case bg-custom-lightgraytwo border-none hover:bg-custom-lightgraytwo text-white mb-2"
                onClick={() => handleConnectWallet()}
              >
                <Image
                  src="/images/Binance_Logo.png"
                  width={30}
                  height={30}
                  alt="Logo"
                />
                Connect Wallet
              </button>
            </div>
            <div className="text-center">
              <div className="text-base font-bold text-white mb-2">
                What is a wallet?
              </div>
              <p className="text-base text-white">
                A wallet is used to send, receive, store, and display digital
                assets. It’s also a new way to login, without needing to create
                new accounts and passwords on every website.
              </p>
              <a className="text-custom-default">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
