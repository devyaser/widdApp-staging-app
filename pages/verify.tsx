import Layout from "../src/components/common/Layout";
import PinnedChats from "../src/components/dashboard/PinnedChats";
import MyChats from "../src/components/dashboard/MyChats";
import Leaderboard from "../src/components/dashboard/Leaderboard";
import Trending from "../src/components/dashboard/Trending";
import Body from "../src/components/dashboard/Body/index";
import RightPart from "../src/components/dashboard/RightPart";
import {
  LoginModal,
  SignupModal,
  VerifyAccountModal,
  CreateChannelModal,
  SearchModal,
  KnowledgeModal,
  WalletConnectModal,
  WalletQRModal,
} from "../src/components/modals";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";

export default function Verify() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [verifyAccountModalOpen, setVerifyAccountModalOpen] = useState(false);
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [knowledgeModalOpen, setKnowledgeModalOpen] = useState(false);
  const [walletConnectModalOpen, setWalletConnectModalOpen] = useState(false);
  const [walletQRModalOpen, setWalletQRModalOpen] = useState(false);
  const [knowledgeId, setKnowledgeId] = useState(0);
  const router = useRouter();
  const [session] = useSession();
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  useEffect(() => {
    router.push("/?step=verify-account");
  }, [router.query]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      // e.preventDefault();
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyK") {
        handleOpenSearchModal();
      }
    });
  }, []);

  const handleStartChat = () => {
    if (session) {
      setCreateChannelModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleCloseLogin = () => {
    setLoginModalOpen(false);
  };

  const handleCloseRegister = () => {
    setSignupModalOpen(false);
  };

  const handleSwitchRegister = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };

  const handleSwitchLogin = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
  };

  const handleSwitchLoginFromVerify = () => {
    setLoginModalOpen(true);
    setVerifyAccountModalOpen(false);
  };

  const handleCloseVerifyAccount = () => {
    setVerifyAccountModalOpen(false);
  };

  const handleCloseCreateChannel = () => {
    setCreateChannelModalOpen(false);
  };

  const handleOpenSearchModal = () => {
    setSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleClickLink = (type: string, category: string, id: number): void => {
    if (category === "knowledge") {
      setKnowledgeModalOpen(true);
      setKnowledgeId(id);
    } else {
      router.push(`?type=${type}&id=${id}`);
      handleCloseSearchModal();
    }
  };

  const handleCloseKnowledgeModal = () => {
    setWalletConnectModalOpen(false);
  };

  const handleCloseWalletConnectModal = () => {
    setWalletConnectModalOpen(false);
  };

  const handleConnectWallet = () => {
    // setWalletConnectModalOpen(false);
    if (!address) {
      open();
    }
    // setWalletQRModalOpen(true);
  };

  const handleCloseWalletQRModal = () => {
    setWalletQRModalOpen(false);
  };

  return (
    <Layout>
      <div className="max-h-[calc(100vh-96px)] flex-1 flex">
        <div className="w-[275px] p-2 lg:block hidden">
          <div className="p-2 pr-4 border-b border-custom-border">
            <button
              className="text-base text-white normal-case btn btn-block bg-custom-primary hover:bg-custom-primary border-custom-primary hover:border-custom-primary"
              onClick={handleStartChat}
            >
              Start a Chat
            </button>
          </div>
          <div className="max-h-[calc(100%-56px)] overflow-auto no-scrollbar">
            <PinnedChats />
            <MyChats />
            <Leaderboard />
            <Trending />
          </div>
        </div>
        <div className="flex flex-col flex-1 p-2">
          <div className="relative w-full mb-2">
            <input
              type="text"
              placeholder="What would you like to see"
              className="w-full bg-black border input border-custom-border text-custom-gray"
              onClick={handleOpenSearchModal}
            />
            <div className="absolute top-0 flex flex-col justify-center h-full text-custom-gray right-3">
              <div className="text-xl">cmd + k</div>
            </div>
          </div>
          <div className="h-[calc(100%-56px)] relative">
            <Body setLoginModalOpen={setLoginModalOpen} />
          </div>
        </div>
        <RightPart />
      </div>
      {/* <LoginModal
        open={loginModalOpen}
        hideModal={handleCloseLogin}
        switchRegister={handleSwitchRegister}
      />
      <SignupModal
        open={signupModalOpen}
        hideModal={handleCloseRegister}
        switchLogin={handleSwitchLogin}
      />
      <VerifyAccountModal
        open={verifyAccountModalOpen}
        hideModal={handleCloseVerifyAccount}
        switchLogin={handleSwitchLoginFromVerify}
      /> */}
      <CreateChannelModal open={createChannelModalOpen} hideModal={handleCloseCreateChannel} />
      <SearchModal
        open={searchModalOpen}
        hideModal={handleCloseSearchModal}
        handleClickLink={handleClickLink}
      />
      <KnowledgeModal
        open={knowledgeModalOpen}
        hideModal={handleCloseKnowledgeModal}
        id={knowledgeId}
      />
      <WalletConnectModal
        open={walletConnectModalOpen}
        hideModal={handleCloseWalletConnectModal}
        handleConnectWallet={handleConnectWallet}
      />
      {/* <WalletQRModal open={walletQRModalOpen} hideModal={handleCloseWalletQRModal} /> */}
    </Layout>
  );
}
