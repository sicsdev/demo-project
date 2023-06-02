import { getAllMembers } from "@/app/API/pages/Members";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = { isLoading: false, data: null, error: null }

export const memberSlice = createSlice({
    name: "members_data",
    initialState,
    reducers: {
        editMembersValue: (state, action) => {
            state.error = null
            state.isLoading = null
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                debugger
                state.isLoading = false;
                state.data = action.payload;

            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})

export const { editMembersValue } = memberSlice.actions;
export default memberSlice.reducer;


export const fetchMembers = createAsyncThunk('members_data/fetchMembers', async () => {
    const response = await getAllMembers()
    return response
});
