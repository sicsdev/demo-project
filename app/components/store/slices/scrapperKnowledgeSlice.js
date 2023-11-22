const { createSlice } = require("@reduxjs/toolkit");

const initialState = { data: null, loader: 0 }

export const scrapperKnowledgeSlice = createSlice({
    name: "logs",
    initialState: initialState
    ,
    reducers: {
        updateScrapperKnowledgeState: (state, action) => {
            state.data = action.payload
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
    }
})

export const { updateScrapperKnowledgeState, setLoader } = scrapperKnowledgeSlice.actions;
export default scrapperKnowledgeSlice.reducer;
