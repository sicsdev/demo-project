import { GetAllRecommendations } from "@/app/API/pages/LearningCenter";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = { isLoading: false, data: null, error: null }

export const fetchRecommendation = createAsyncThunk('recommendation/fetchRecommendation', async () => {
    const response = await GetAllRecommendations(1, '&ordering=-number_of_messages')
    return response
});

const handleCount = (data) => {
    const result = data?.results?.filter((item) => !item.accepted);
    return { ...data, totalCount: result?.length };
}

export const recommendationSlice = createSlice({
    name: "recommendation_data",
    initialState,
    reducers: {
        editRecommendation: (state, action) => {
            return { ...state, data: action.payload }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendation.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecommendation.fulfilled, (state, action) => {
                state.isLoading = false;
                const result = handleCount(action.payload)
                state.data = result;

            })
            .addCase(fetchRecommendation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})

export const { editRecommendation } = recommendationSlice.actions;
export default recommendationSlice.reducer;



