import { getAllIntegrationTemplates } from "@/app/API/pages/Integration";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = { isLoading: false, data: null, error: null }


export const fetchIntegrationsTemplates = createAsyncThunk('integration/fetchIntegrationTemplates', async () => {
    const response = await getAllIntegrationTemplates()
    return response
});

export const integrationTemplateSlice = createSlice({
    name: "integrationTemplates",
    initialState,
    reducers: {
        editIntegrationTemplateValue: (state, action) => {
            state.error = null
            state.isLoading = null
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIntegrationsTemplates.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchIntegrationsTemplates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;

            })
            .addCase(fetchIntegrationsTemplates.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})

export const { editIntegrationTemplateValue } = integrationTemplateSlice.actions;
export default integrationTemplateSlice.reducer;



