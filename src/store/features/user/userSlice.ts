import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/reducer";
import { useSelector } from "react-redux";
import axios from "axios";
import { getUserById } from "services/user.services";

interface IUserState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
}

let localStorageToken = null;

if (typeof window !== "undefined") {
  localStorageToken = window.localStorage.getItem("jwt_access_token");
}

const initialState: IUserState = {
  token: localStorageToken,
  user: null,
  loading: true,
};

export const refreshUserAsync = createAsyncThunk("user/get", async (userId: string, thunkAPI) => {
  try {
    const response = await getUserById(userId);
    return thunkAPI.fulfillWithValue(response.data?.data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      if (
        typeof window !== "undefined" &&
        action.payload.token !== null &&
        action.payload.token !== undefined &&
        action.payload.token !== "" &&
        action.payload.token !== "null"
      ) {
        window.localStorage.setItem("jwt_access_token", action.payload.token as string);
        axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.token}`;
      }
    },
    setUserDetails: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        delete axios.defaults.headers.common["Authorization"];
        window.localStorage.removeItem("jwt_access_token");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshUserAsync.fulfilled, (state, action) => {
      console.log("refreshUserAsync.fulfilled", action.payload);
      state.user = action.payload;
    });
    builder.addCase(refreshUserAsync.rejected, (state, action) => {
      state.user = null;
    });
  },
});

export const { logoutUser, setUserDetails, setUser } = userSlice.actions;

export const useUserSelector = () => useSelector((state: RootState) => state.user);
