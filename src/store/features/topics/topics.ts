import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "store/reducer";
import { useSelector } from "react-redux";
import {
  addNewTopic,
  getAllTopics,
  getOwnedTopicsData,
  getTopicById,
  getUsersInTopic,
} from "services/topics.services";
import { TOPICS_CATEGORIES } from "utils/common";
import { toast } from "react-toastify";


interface ITopicsState {
  topicsLoader: boolean;
  allTopics: ITopic[];
  chatTopics: ITopic[];
  DAOTopics: ITopic[];
  NFTTopics: ITopic[];
  ownedTopics: ITopic[];
  cryptoTopics: ITopic[];
  pinnedTopics: ITopic[];
}

const initialState: ITopicsState = {
  allTopics: [],
  chatTopics: [],
  DAOTopics: [],
  NFTTopics: [],
  cryptoTopics: [],
  ownedTopics: [],
  topicsLoader: false,
  pinnedTopics: [],
};

export const fetchAllTopicsAsync = createAsyncThunk(
  "topics/getAllTopics",
  async (
    props: { pagination: IPagination; userId?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllTopics(
        props.pagination,
        TOPICS_CATEGORIES.ALL,
        props?.userId
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchChatTopicsAsync = createAsyncThunk(
  "topics/getChatTopics",
  async (
    props: { pagination: IPagination; userId?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllTopics(
        props.pagination,
        TOPICS_CATEGORIES.CHAT,
        props?.userId
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchNFTTopicsAsync = createAsyncThunk(
  "topics/getNFTTopics",
  async (
    props: { pagination: IPagination; userId?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllTopics(
        props.pagination,
        TOPICS_CATEGORIES.NFT,
        props?.userId
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDAOTopicsAsync = createAsyncThunk(
  "topics/getDAOTopics",
  async (
    props: { pagination: IPagination; userId?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllTopics(
        props.pagination,
        TOPICS_CATEGORIES.DAO,
        props?.userId
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCryptoTopicsAsync = createAsyncThunk(
  "topics/getCryptoTopics",
  async (
    props: { pagination: IPagination; userId?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllTopics(
        props.pagination,
        TOPICS_CATEGORIES.CRYPTO,
        props?.userId
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const addNewTopicAsync = createAsyncThunk(
  "topics/add",
  async ({ topic }: { topic: Partial<ITopic> }, { rejectWithValue }) => {
    try {
      const response = await addNewTopic(topic);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getOwnedTopicsAsync = createAsyncThunk(
  "topics/getOwned",
  async () => {
    try {
      const response = await getOwnedTopicsData({ page: 1, pageSize: 100 });
      return response.data.data;
    } catch (error: any) {
      return error;
    }
  }
);

export const getTopicByIdAsync = createAsyncThunk(
  "topic/getById",
  async (topicId: string) => {
    try {
      const requests = [getTopicById(topicId), getUsersInTopic(topicId)];
      const responses = await Promise.all(requests);
      const topic = responses[0].data.data[0];
      const members = responses[1].data.data;
      const data = { ...topic, members };
      return data;
    } catch (error: any) {
      return error;
    }
  }
);

export const topicsSlice = createSlice({
  name: "topics/set",
  initialState,
  reducers: {
    removeTopic: (state, action: PayloadAction<string>) => {
      state.allTopics = state.allTopics.filter(
        (topic) => topic._id !== action.payload
      );
      state.chatTopics = state.chatTopics.filter(
        (topic) => topic._id !== action.payload
      );
      state.NFTTopics = state.NFTTopics.filter(
        (topic) => topic._id !== action.payload
      );
      state.DAOTopics = state.DAOTopics.filter(
        (topic) => topic._id !== action.payload
      );
      state.cryptoTopics = state.cryptoTopics.filter(
        (topic) => topic._id !== action.payload
      );
      state.ownedTopics = state.ownedTopics.filter(
        (topic) => topic._id !== action.payload
      );
    },
    setPinnedTopics: (state, action: PayloadAction<ITopic[]>) => {
      state.pinnedTopics = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatTopicsAsync.fulfilled, (state, action) => {
        state.chatTopics = action.payload;
        state.topicsLoader = false;
      })
      .addCase(fetchChatTopicsAsync.rejected, (state) => {
        state.chatTopics = [];
        state.topicsLoader = false;
        toast.error("Error while fetching topics");
      })
      .addCase(addNewTopicAsync.pending, (state) => {
        state.topicsLoader = true;
      });

    builder
      .addCase(fetchNFTTopicsAsync.fulfilled, (state, action) => {
        state.NFTTopics = action.payload;
        state.topicsLoader = false;
      })
      .addCase(fetchNFTTopicsAsync.rejected, (state) => {
        state.NFTTopics = [];
        state.topicsLoader = false;
        toast.error("Error while fetching topics");
      })
      .addCase(fetchNFTTopicsAsync.pending, (state) => {
        state.topicsLoader = true;
      });

    builder
      .addCase(fetchDAOTopicsAsync.fulfilled, (state, action) => {
        state.DAOTopics = action.payload;
        state.topicsLoader = false;
      })
      .addCase(fetchDAOTopicsAsync.rejected, (state) => {
        state.DAOTopics = [];
        state.topicsLoader = false;
        toast.error("Error while fetching topics");
      })
      .addCase(fetchDAOTopicsAsync.pending, (state) => {
        state.topicsLoader = true;
      });

    builder
      .addCase(fetchCryptoTopicsAsync.fulfilled, (state, action) => {
        state.cryptoTopics = action.payload;
        state.topicsLoader = false;
      })
      .addCase(fetchCryptoTopicsAsync.rejected, (state) => {
        state.cryptoTopics = [];
        state.topicsLoader = false;
        toast.error("Error while fetching topics");
      })
      .addCase(fetchCryptoTopicsAsync.pending, (state) => {
        state.topicsLoader = true;
      });

    builder
      .addCase(fetchAllTopicsAsync.fulfilled, (state, action) => {
        state.allTopics = action.payload;
        state.topicsLoader = false;
      })
      .addCase(fetchAllTopicsAsync.rejected, (state) => {
        state.allTopics = [];
        state.topicsLoader = false;
        toast.error("Error while fetching topics");
      })
      .addCase(fetchAllTopicsAsync.pending, (state) => {
        state.topicsLoader = true;
      });

    builder
      .addCase(getOwnedTopicsAsync.fulfilled, (state, action) => {
        state.ownedTopics = action.payload;
        state.topicsLoader = false;
      })
      .addCase(getOwnedTopicsAsync.rejected, (state) => {
        state.ownedTopics = [];
        state.topicsLoader = false;
        toast.error("Error while fetching topics");
      })
      .addCase(getOwnedTopicsAsync.pending, (state) => {
        state.topicsLoader = true;
      });
  },
});

export const { removeTopic, setPinnedTopics } = topicsSlice.actions;
export const useTopicsSelector = () =>
  useSelector((state: RootState) => state.topics);
