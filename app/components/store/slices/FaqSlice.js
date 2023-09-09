import { getKnowledgeData } from "@/app/API/pages/Knowledge";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = { isLoading: false, data: null, automation: null, error: null }


export const fetchFaq = createAsyncThunk('faq/fetchfaq', async () => {
    const response = await getKnowledgeData()
    return response
});

export const faqSlice = createSlice({
    name: "faw",
    initialState,
    reducers: {
        editFaq: (state, action) => {
            state.error = null
            state.isLoading = null
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaq.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFaq.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;

            })
            .addCase(fetchFaq.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})

export const { editFaq } = faqSlice.actions;
export default faqSlice.reducer;