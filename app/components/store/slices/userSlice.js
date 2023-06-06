import { getUserProfile } from "@/app/API/components/Sidebar";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = { isLoading: false, data: null, error: null }

export const userSlice = createSlice({
    name: "user_profile",
    initialState,
    reducers: {
        editUserValue: (state, action) => {
            state.error = null
            state.isLoading = null
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;

            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})

export const { editUserValue } = userSlice.actions;
export default userSlice.reducer;


export const fetchProfile = createAsyncThunk('user_profile/fetchUserData', async () => {
    const response = await getUserProfile()
    return response
});
