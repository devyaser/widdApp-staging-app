import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import FollowerList from "./FollwersList";
import {
  createList,
  getAllFollowers,
  removeFollowers,
} from "services/user.services";
import { toast } from "react-toastify";
import { deleteUserList, getAllUsersLists } from "services/list.services";
import { useUserSelector } from "store/features/user/userSlice";
import CreateListModal from "./CreateListModal";

const FollowedUsers = () => {
  const [openCreateListModal, setOpenCreateListModal] =
    useState<boolean>(false);
  const [usersList, setUsersList] = useState<IList[]>([]);
  const [selectedUsersList, setSelectedUsersList] = useState<string>("");
  const [followedUsers, setFollowedUsers] = useState<IFollowedUser[]>([]);
  const [selectedFollowedUsers, setSelectedFollowedUsers] = useState<string[]>(
    []
  );
  const [followedUsersLoading, setFollowedUsersLoading] =
    useState<boolean>(true);
  const [usersListLoading, setUsersListLoading] = useState<boolean>(true);
  const [removeFollowersLoading, setRemoveFollowersLoading] =
    useState<boolean>(false);
  const [removeUserListLoading, setRemoveUserListLoading] =
    useState<boolean>(false);
  const { user } = useUserSelector();
  const [pagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
  });
  const [isCreatingList, setIsCreatingList] = useState<boolean>(false);

  useEffect(() => {
    setFollowedUsersLoading(true);
    getAllFollowers(user?._id as string, pagination)
      .then((res) => {
        setFollowedUsers(res?.data?.data as IFollowedUser[]);
        setFollowedUsersLoading(false);
      })
      .catch((err: any) => {
        setFollowedUsersLoading(false);
        toast.error(err?.response?.data?.message);
      });
  }, []);

  useEffect(() => {
    setUsersListLoading(true);
    getAllUsersLists()
      .then((res) => {
        setUsersList(res?.data?.data as IList[]);
        setUsersListLoading(false);
      })
      .catch((err) => {
        setUsersListLoading(false);
        toast.error(err?.response?.data?.message);
      });
  }, []);

  const handleRemoveSelectedUsersLists = () => {
    setRemoveUserListLoading(true);
    deleteUserList(selectedUsersList)
      .then((_res) => {
        setRemoveUserListLoading(false);
        toast.success("Successfully deleted the user list.")
        setUsersList(usersList.filter(item => item._id !== selectedUsersList))
      })
      .catch((err) => {
        setRemoveUserListLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleRemoveSelectedFollowers = () => {
    setRemoveFollowersLoading(true);
    removeFollowers(selectedFollowedUsers).then((res) => {
      toast.success(res?.data?.message);
      const filteredFollowedUsers = followedUsers.filter(
        (user: IFollowedUser) =>
          !selectedFollowedUsers.includes(user?.followedBy._id as string)
      );
      setFollowedUsers(filteredFollowedUsers);
      setSelectedFollowedUsers([]);
      setRemoveFollowersLoading(false);
    });
  };

  const toggleSelectUserList = (listId: string) => {
    setSelectedUsersList(listId);
    // const indexOfList = selectedUsersLists.indexOf(listId);

    // if (indexOfList !== -1) {
    //   setSelectedUsersLists((prev) => {
    //     const newUsersList = [...prev];
    //     newUsersList.splice(indexOfList, 1);
    //     return newUsersList;
    //   });
    // } else {
    //   setSelectedUsersLists((prev) => [...prev, listId]);
    // }
  };

  const toggleSelectFollower = (userId: string) => {
    const indexOfUser = selectedFollowedUsers.indexOf(userId);

    if (indexOfUser !== -1) {
      setSelectedFollowedUsers((prev) => {
        const newFollowedUsers = [...prev];
        newFollowedUsers.splice(indexOfUser, 1);
        return newFollowedUsers;
      });
    } else {
      setSelectedFollowedUsers((prev) => [...prev, userId]);
    }
  };

  const handleCreateList = () => {
    setOpenCreateListModal(true);
  };

  const handleCreateListSubmit = (listName: string) => {
    setIsCreatingList(true);
    createList(listName, selectedFollowedUsers)
      .then((res) => {
        setIsCreatingList(false);
        setOpenCreateListModal(false);
        setUsersList([res?.data?.data, ...usersList]);
        setSelectedFollowedUsers([]);
        toast.success("Successfully created the list.")
      })
      .catch((err) => {
        setIsCreatingList(false);
        toast.error("Unable to create list.")
      });
  };

  return (
    <div>
      <div className="font-semibold">User list</div>
      <div className="text-[13px]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
      </div>

      <UserList
        loading={usersListLoading}
        usersLists={usersList}
        removeLoading={removeUserListLoading}
        selectedUsersList={selectedUsersList}
        toggleSelectUserList={toggleSelectUserList}
        handleRemoveSelectedUsersLists={handleRemoveSelectedUsersLists}
      />

      <FollowerList
        loading={followedUsersLoading}
        followedUsers={followedUsers}
        removeLoading={removeFollowersLoading}
        selectedFollowedUsers={selectedFollowedUsers}
        toggleSelectFollowedUser={toggleSelectFollower}
        handleRemoveFollowedUsers={handleRemoveSelectedFollowers}
        handleCreateList={handleCreateList}
        handleInvite={() => {}}
      />

      {openCreateListModal && <CreateListModal
        open={openCreateListModal}
        hideModal={() => setOpenCreateListModal(false)}
        onSubmit={handleCreateListSubmit}
        loading={isCreatingList}
      />}
    </div>
  );
};

export default FollowedUsers;
