import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export type RoootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;