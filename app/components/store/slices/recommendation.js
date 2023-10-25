import { GetAllRecommendations } from "@/app/API/pages/LearningCenter";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { isLoading: false, data: null, error: null };

export const fetchRecommendation = createAsyncThunk(
  'recommendation/fetchRecommendation',
  async (queryParam = '&page=1&page_size=10&ordering=-number_of_messages') => {
    try {
      const response = await GetAllRecommendations(queryParam);
      return response;
    } catch (error) {
      throw Error(error.message || "Unable to fetch recommendations");
    }
  }
);

const handleCount = (data) => {
  const result = data?.results?.filter((item) => !item.accepted);
  return { ...data, totalCount: result?.length };
}

export const recommendationSlice = createSlice({
  name: "recommendation_data",
  initialState,
  reducers: {
    editRecommendation: (state, action) => {
      state.data = action.payload;
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
        state.data = handleCount(action.payload);
      })
      .addCase(fetchRecommendation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
})

export const { editRecommendation } = recommendationSlice.actions;
export default recommendationSlice.reducer;
