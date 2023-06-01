const { createSlice } = require("@reduxjs/toolkit");

export const botIdSlice = createSlice({
    name: "bot_id",
    initialState: { id: null }
    ,
    reducers: {
        setBotId: (state, action) => {
            state.id = action.payload
        },
    }
})

export const { setBotId } = botIdSlice.actions;
export default botIdSlice.reducer;
