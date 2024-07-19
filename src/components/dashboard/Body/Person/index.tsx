import React from "react";
import User from "../User";
import { mock_chats, mock_users } from "../../../../mock-data";
import { useRouter } from "next/router";

const Person = () => {
  const router = useRouter();
  const { username } = router.query;

  const user: any =
    mock_users.find((user) => user.username === username) ?? mock_users[0];
  const user_chats = mock_chats.filter((chats) => chats.username === username);
  return (
    <User avatar={user.avatar} username={user.username} chats={user_chats} />
  );
};

export default Person;
