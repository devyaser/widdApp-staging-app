import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { useWindowSize } from "usehooks-ts";

import Layout from "../src/components/common/Layout";
import Body from "../src/components/dashboard/Body/index";
import RightPart from "../src/components/dashboard/RightPart";
import Footer from "../src/components/common/Footer";
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
import PopupBar from "../src/components/dashboard/PopupBar";
import { setUser, useUserSelector } from "store/features/user/userSlice";
import { getUserByToken } from "services/user.services";
import { useAppDispatch } from "store/store";
import { toast } from "react-toastify";

export default function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [verifyAccountModalOpen, setVerifyAccountModalOpen] = useState(false);
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);
  const [userToBeVerified, setUserToBeVerified] = useState<IUserToBeVerified>(
    {} as IUserToBeVerified
  );
  const { user, loading, token } = useUserSelector();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [knowledgeModalOpen, setKnowledgeModalOpen] = useState(false);
  const [walletConnectModalOpen, setWalletConnectModalOpen] = useState(false);
  const [walletQRModalOpen, setWalletQRModalOpen] = useState(false);
  const [knowledgeId, setKnowledgeId] = useState(0);
  const router = useRouter();
  const [session] = useSession();
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.step === "verify-account") {
      setVerifyAccountModalOpen(true);
    }
  }, [router.query]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      // e.preventDefault();
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyK") {
        handleOpenSearchModal();
      }
    });
  }, []);

  useEffect(() => {
    if (window) window.scrollTo(0, 1);
  }, []);

  const handleStartChat = () => {
    if (token && user?._id) {
      // setCreateChannelModalOpen(true);
      router.push("?type=start_topic");
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

  const handleSignUpSuccess = (userToBeVerified: IUserToBeVerified) => {
    setUserToBeVerified(userToBeVerified);
    setVerifyAccountModalOpen(true);
    setSignupModalOpen(false);
  };

  const handleSwitchToVerifyAccount = (userToBeVerified: IUserToBeVerified) => {
    setUserToBeVerified(userToBeVerified);
    setVerifyAccountModalOpen(true);
    setLoginModalOpen(false);
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
    setKnowledgeModalOpen(false);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt_access_token");
    if (!token) {
      dispatch(setUser({ token: null, user: null, loading: false }));
      return;
    } else {
      getUserByToken(token as string)
        .then(async (res) => {
          console.log(res.data.data);
          dispatch(setUser({ token: token as string, user: res.data.data, loading: false }));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setUser({ token: null, user: null, loading: false }));
          toast.error("Session expired. Please login again.")
        });
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (width < 992) {
    return (
      <Layout>
        <div className="relative flex w-full body-wrapper">
          <div className="flex-1 py-2 px-[10px] flex flex-col h-[calc(100%-72px)] lg:h-auto relative">
            <PopupBar handleStartChat={handleStartChat} />
            <div className="h-[calc(100%-135px)] relative">
              <Body setLoginModalOpen={setLoginModalOpen} />
            </div>
          </div>
          {/* <RightPart /> */}
        </div>
        <LoginModal
          open={loginModalOpen}
          hideModal={handleCloseLogin}
          switchRegister={handleSwitchRegister}
          switchVerification={handleSwitchToVerifyAccount}
        />
        <SignupModal
          open={signupModalOpen}
          hideModal={handleCloseRegister}
          handleSignUpSuccess={handleSignUpSuccess}
          switchLogin={handleSwitchLogin}
        />
        <VerifyAccountModal
          open={verifyAccountModalOpen}
          hideModal={handleCloseVerifyAccount}
          userToBeVerified={userToBeVerified}
          switchLogin={handleSwitchLoginFromVerify}
        />
        <CreateChannelModal open={createChannelModalOpen} hideModal={handleCloseCreateChannel} />
        {/* <SearchModal
          open={searchModalOpen}
          hideModal={handleCloseSearchModal}
          handleClickLink={handleClickLink}
        /> */}
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
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-h-[calc(100vh-96px)] flex-1 flex">
        <PopupBar handleStartChat={handleStartChat} />
        <div className="flex flex-col flex-1 p-2">
          <div className="h-[100%] relative">
            <Body setLoginModalOpen={setLoginModalOpen} />
          </div>
        </div>
        {/* <RightPart /> */}
      </div>
      <LoginModal
        open={loginModalOpen}
        hideModal={handleCloseLogin}
        switchRegister={handleSwitchRegister}
        switchVerification={handleSwitchToVerifyAccount}
      />
      <SignupModal
        open={signupModalOpen}
        handleSignUpSuccess={handleSignUpSuccess}
        hideModal={handleCloseRegister}
        switchLogin={handleSwitchLogin}
      />
      <VerifyAccountModal
        open={verifyAccountModalOpen}
        hideModal={handleCloseVerifyAccount}
        userToBeVerified={userToBeVerified}
        switchLogin={handleSwitchLoginFromVerify}
      />
      <CreateChannelModal open={createChannelModalOpen} hideModal={handleCloseCreateChannel} />
      {/* <SearchModal
        open={searchModalOpen}
        hideModal={handleCloseSearchModal}
        handleClickLink={handleClickLink}
      /> */}
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
      <Footer />
      {/* <WalletQRModal open={walletQRModalOpen} hideModal={handleCloseWalletQRModal} /> */}
    </Layout>
  );
}
