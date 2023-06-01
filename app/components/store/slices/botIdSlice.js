const { createSlice } = require("@reduxjs/toolkit");

export const botIdSlice = createSlice({
    name: "bot_id",
    initialState: { id: '240a4e82-3c9f-4fbc-b130-751027daa87a' }
    ,
    reducers: {
        setBotId: (state, action) => {
            state.id = action.payload
        },
    }
})

export const { setBotId } = botIdSlice.actions;
export default botIdSlice.reducer;
