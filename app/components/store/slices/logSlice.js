const { createSlice } = require("@reduxjs/toolkit");

const initialState = { data: null }

export const logSlice = createSlice({
    name: "logs",
    initialState: initialState
    ,
    reducers: {
        updateLogState: (state, action) => {
            state.data = action.payload
        },
    }
})

export const { updateLogState } = logSlice.actions;
export default logSlice.reducer;
