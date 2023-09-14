import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    date: null
};

const daySlice = createSlice({
    name: 'day',
    initialState,
    reducers: {
        setDayDate(state, action) {
            state.date = action.payload;
        },
        removeDayDate(state) {
            state.date = null;
        }
    }
});

export const {setDayDate, removeDayDate} = daySlice.actions;

export default daySlice.reducer;