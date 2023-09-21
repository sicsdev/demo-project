const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { getFaqQuestions } from "@/app/API/pages/Knowledge";

const initialState = { isLoading: false, data: null, error: null }

export const fetchFaqQuestions = createAsyncThunk('faqQuestions/fetchFaqQuestions', async (queryParam = `page=1&page_size=10`) => {
    const response = await getFaqQuestions(queryParam)
    return response
});

export const faqQuestionsSlice = createSlice({
    name: "faq_questions_data",
    initialState,
    reducers: {
        editFaqQuestions: (state, action) => {
            return { ...state, data: action.payload }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaqQuestions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFaqQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchFaqQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})

export const { editFaqQuestions } = faqQuestionsSlice.actions;
export default faqQuestionsSlice.reducer;