import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/reducer";
import { mock_chat } from "../../../mock-data";
import { useSelector } from "react-redux";
import { sendMessage } from "services/chat.services";
import { Socket } from "socket.io-client";

export interface ChatState {
  pinnedChats: IChat[];
  followingChats: any;
  socket: Socket | null;
}

const initialState: ChatState = {
  pinnedChats: [mock_chat],
  followingChats: [],
  socket: null,
};

export const sendMessageAsync = createAsyncThunk("chat/sendMessage", sendMessage);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPinnedChats: (state, action: PayloadAction<any>) => {
      state.pinnedChats = action.payload;
    },
  },
});

export const { setPinnedChats } = chatSlice.actions;

export const useChatSelector = () => useSelector((state: RootState) => state.chat);
