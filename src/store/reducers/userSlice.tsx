import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface userState {
    userLog: string,
    login : boolean
}

const initialState: userState = {
    userLog: '',
    login: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startSession: (state: userState, action : PayloadAction<userState>) => {
            state.userLog = action.payload.userLog,
            state.login = action.payload.login
        },
        destroySession: (state: userState) => {
            state.userLog = '',
            state.login = false
        },
    }
})

export const { startSession, destroySession } = userSlice.actions

export const getSession = (state: RootState) => state.user.userLog

export default userSlice.reducer