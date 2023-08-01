import { getAllWorkflow } from "@/app/API/pages/Workflow";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = { isLoading: false, data: null, error: null }


export const fetchWorkflows = createAsyncThunk('workflow/fetchWorkflow', async () => {
    const response = await getAllWorkflow()
    return response
});

export const workflowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        editWorkflowValue: (state, action) => {
            state.error = null
            state.isLoading = null
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkflows.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWorkflows.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;

            })
            .addCase(fetchWorkflows.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})

export const { editUserValue } = workflowSlice.actions;
export default workflowSlice.reducer;