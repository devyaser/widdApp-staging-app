import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import UserAvatar from "@/components/common/UserAvatar";
import React from "react";

const FollowerList = ({
  loading,
  removeLoading,
  selectedFollowedUsers,
  followedUsers,
  toggleSelectFollowedUser,
  handleRemoveFollowedUsers,
  handleCreateList,
  handleInvite,
}: {
  loading: boolean;
  removeLoading: boolean;
  selectedFollowedUsers: string[];
  followedUsers: IFollowedUser[];
  toggleSelectFollowedUser: Function;
  handleRemoveFollowedUsers: Function;
  handleCreateList: Function;
  handleInvite: Function;
}) => {
  return (
    <div className="bg-custom-lightgrayone mt-4 rounded-md px-4 ">
      <div className="px-4 py-2 border-b border-custom-border">
        <div className="flex items-center justify-between">
          <div className="text-xs">
            {selectedFollowedUsers.length > 0 &&
              `${selectedFollowedUsers.length} ${
                selectedFollowedUsers.length > 1 ? "items" : "item"
              } selected`}{" "}
          </div>

          <div className="flex gap-2">
            <Button variant="dark" onClick={handleCreateList} disabled={selectedFollowedUsers?.length === 0}>
              Create List
            </Button>
            <Button
              isLoading={removeLoading}
              variant="dark"
              onClick={handleRemoveFollowedUsers}
              disabled={selectedFollowedUsers.length === 0}
            >
              Remove Users
            </Button>
            <Button variant="dark" onClick={handleInvite}>
              Invite
            </Button>
          </div>
        </div>
      </div>

      <div className="max-h-[19vh] lg:max-h-[40vh] overflow-auto no-scrollbar">
        {loading ? (
          <Loader />
        ) : followedUsers?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3">
            {followedUsers.map((user, i) => (
              <div
                className="px-4 py-2 flex items-center gap-4 border-b border-custom-border "
                key={user._id}
              >
                <input
                  type="checkbox"
                  checked={selectedFollowedUsers.includes(user?.followedBy?._id as string)}
                  className=" h-4 w-4 accent-custom-primary bg-grey-700 text-red-500  rounded cursor-pointer"
                  onChange={() => toggleSelectFollowedUser(user.followedBy?._id)}
                />
                <UserAvatar
                  src={(user.followedBy?.profileImageUrl as string) ?? ""}
                  username={user.followedBy?.userName as string}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-4 flex items-center justify-center opacity-50 border-b border-custom-border">
            No user
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowerList;
