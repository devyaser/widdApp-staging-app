import Image from "next/image";
import Link from "next/link";
import { useWindowSize } from "usehooks-ts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserSelector } from "store/features/user/userSlice";
import { useAppDispatch } from "store/store";
import { KnowledgeModal, SearchModal } from "../../modals";
import { logoutUser } from "store/features/user/userSlice";

export default function Topbar(): any {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [knowledgeModalOpen, setKnowledgeModalOpen] = useState(false);
  const [knowledgeId, setKnowledgeId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { user, token } = useUserSelector();
  const dispatch = useAppDispatch();

  const { width } = useWindowSize();
  const router = useRouter();

  const handleSignOut = () => {
    dispatch(logoutUser());
    window.location.reload();
    // setIsOpen(false);
  };

  const showProfile = () => {
    router.push("?type=settings/profile");
    setIsOpen(false);
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

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      // e.preventDefault();
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyK") {
        handleOpenSearchModal();
      }
    });
  }, []);

  if (width < 992) {
    return (
      <div className="absolute top-0 navbar border-b border-custom-border flex justify-between items-center gap-2 min-h-fit py-[10px] px-3">
        <div>
          <Link href="/" className="h-auto text-xl normal-case btn btn-ghost">
            <Image src="/images/logo-mobile-pod.png" width={30} height={30} alt="Logo" />
          </Link>
        </div>
        {token && user?._id ? (
          <div className="relative w-full">
            <input
              type="text"
              placeholder="What would you like to see"
              className="h-[32px] px-[15px] text-base font-medium input w-full bg-black border border-custom-border text-custom-gray"
              onClick={handleOpenSearchModal}
            />
            <div className="absolute top-0 flex-col justify-center hidden h-full lg:flex text-custom-gray right-3">
              <div className="text-xl">cmd + k</div>
            </div>
          </div>
        ) : null}
        {user?._id && token && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="w-auto h-auto btn btn-ghost min-h-fit btn-circle avatar"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <Image src={"/icons/hamburger.svg"} width={24} height={24} alt="Logo" />
            </label>

            {isOpen && (
              <ul
                tabIndex={0}
                className="z-10 w-40 p-2 mt-3 text-white shadow menu menu-sm dropdown-content bg-custom-lightgraytwo rounded-box"
              >
                <li>
                  <a onClick={showProfile} className="hover:text-primary">
                    Profile
                  </a>
                </li>
                <li>
                  <a onClick={handleSignOut} className="hover:text-primary">
                    Sign out
                  </a>
                </li>
              </ul>
            )}
          </div>
        )}

        <SearchModal
          open={searchModalOpen}
          hideModal={handleCloseSearchModal}
          handleClickLink={handleClickLink}
        />

        <KnowledgeModal
          open={knowledgeModalOpen}
          hideModal={() => setKnowledgeModalOpen(false)}
          id={knowledgeId}
        />
      </div>
    );
  }

  return (
    <div className="absolute top-0 navbar border-b border-custom-border min-h-fit py-3 px-5 gap-[8px]">
      <div className="w-[255px] pr-4">
        <Link href="/" className="h-auto text-xl normal-case btn btn-ghost">
          <Image src="/images/logo-1-pod.png" width={255} height={72} alt="Logo" />
        </Link>
      </div>
      {token && user?._id && (
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="What would you like to see"
            className="w-full text-xl bg-black border input border-custom-border text-custom-gray"
            onClick={handleOpenSearchModal}
          />
          <div className="absolute top-0 flex flex-col justify-center h-full text-custom-gray right-3">
            <div className="text-xl">cmd + k</div>
          </div>
        </div>
      )}
      {token && user?._id && (
        <div className="space-x-3 w-[230px] flex justify-end">
          {/* <div className="btn btn-ghost border-none p-0 w-[63px] h-[63px]">
            <Link href="?type=person&username=torem">
              <Image src="/images/chat.png" width={63} height={63} alt="Chat" />
            </Link>
          </div> */}
          <div className="btn btn-ghost border-none p-0 w-[63px] h-[63px]">
            <Image src="/images/user-initial.png" width={63} height={63} alt="Notification" />
          </div>
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="border-none pt-1 btn btn-ghost p-0 avatar w-[63px] h-[63px] rounded-full overflow-hidden"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <Image
                src={user?.profileImageUrl ? user?.profileImageUrl : "/images/user-initial.png"}
                width={60}
                height={60}
                alt="Logo"
                className="rounded-full overflow-hidden"
              />
            </label>
            {isOpen && (
              <ul
                tabIndex={0}
                className="z-10 p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={showProfile}>Profile</a>
                </li>
                <li>
                  <a onClick={handleSignOut}>Sign out</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}

      <SearchModal
        open={searchModalOpen}
        hideModal={handleCloseSearchModal}
        handleClickLink={handleClickLink}
      />

      <KnowledgeModal
        open={knowledgeModalOpen}
        hideModal={() => setKnowledgeModalOpen(false)}
        id={knowledgeId}
      />
    </div>
  );
}
