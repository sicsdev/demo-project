import { getAllIntegration } from "@/app/API/pages/Integration";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = { isLoading: false, data: null, error: null }


export const fetchIntegrations = createAsyncThunk('integration/fetchIntegration', async () => {
    const response = await getAllIntegration()
    return response
});

export const integrationSlice = createSlice({
    name: "integration",
    initialState,
    reducers: {
        editIntegrationValue: (state, action) => {
            state.error = null
            state.isLoading = null
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIntegrations.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchIntegrations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;

            })
            .addCase(fetchIntegrations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})

export const { editUserValue } = integrationSlice.actions;
export default integrationSlice.reducer;



