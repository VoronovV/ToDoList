import {configureStore} from "@reduxjs/toolkit";
import dayReducer from './slices/dayDateSlice';

export const store = configureStore({
    reducer: {
        day: dayReducer
    }
})