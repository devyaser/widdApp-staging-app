import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './features/user/userSlice'
import {chatSlice} from './features/chat/chatSlice'
import { topicsSlice } from './features/topics/topics'

export interface RootState {
    user: ReturnType<typeof userSlice.reducer>
    chat: ReturnType<typeof chatSlice.reducer>
    topics: ReturnType<typeof topicsSlice.reducer>
}
export const rootReducer = combineReducers({
    user: userSlice.reducer,
    chat: chatSlice.reducer,
    topics: topicsSlice.reducer,
})