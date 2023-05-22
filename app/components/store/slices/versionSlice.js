const { createSlice } = require("@reduxjs/toolkit");

export const versionSlice = createSlice({
    name: "cart",
    initialState: "1.0"
    ,
    reducers: {
        version: (state, action) => {
            state = state.version
        },
    }
})

export const { version } = versionSlice.actions;
export default versionSlice.reducer;
