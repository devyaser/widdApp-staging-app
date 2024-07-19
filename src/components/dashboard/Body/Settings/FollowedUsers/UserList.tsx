import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import React from "react";

const UserList = ({
  loading,
  removeLoading,
  selectedUsersList,
  usersLists,
  toggleSelectUserList,
  handleRemoveSelectedUsersLists,
}: {
  loading: boolean;
  selectedUsersList: string;
  removeLoading: boolean;
  usersLists: IList[];
  toggleSelectUserList: Function;
  handleRemoveSelectedUsersLists: Function;
}) => {
  return (
    <div className="bg-custom-lightgrayone mt-4 rounded-md px-4 ">
      <div className="px-4 py-2 border-b border-custom-border">
        <div className="flex items-center justify-between">
          <div className="text-xs">
            {/* {selectedUsersLists.length > 0 &&
              `${selectedUsersLists.length} ${
                selectedUsersLists.length > 1 ? "items" : "item"
              } selected`}{" "} */}
          </div>

          <Button
            isLoading={removeLoading}
            variant="dark"
            onClick={handleRemoveSelectedUsersLists}
            disabled={!selectedUsersList}
          >
            Remove List
          </Button>
        </div>
      </div>
      <div className="max-h-[180px] overflow-auto no-scrollbar">
        {loading ? (
          <Loader />
        ) : usersLists?.length > 0 ? (
          usersLists.map((list, i) => {
            return (
              <div
                className="px-4 py-2 flex items-center gap-4 border-b border-custom-border "
                key={list?._id}
              >
                <input
                  type="radio"
                  name="userList"
                  checked={selectedUsersList === list._id}
                  className=" h-4 w-4 accent-custom-primary bg-grey-700 text-red-500  rounded cursor-pointer"
                  onChange={() => toggleSelectUserList(list._id)}
                />

                <div className="w-auto  font-bold text-custom-sky">{list.name}</div>
              </div>
            );
          })
        ) : (
          <div className="px-4 py-4 flex items-center justify-center opacity-50 border-b border-custom-border">
            No user
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
