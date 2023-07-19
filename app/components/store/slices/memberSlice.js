import { changeMemberRole, deleteMember, getAllMembers } from "@/app/API/pages/Members";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = { isLoading: false, deleteLoading: false, data: null, error: null }

const updatePayloadData = (data) => {
    return data;
}

export const memberSlice = createSlice({
    name: "members_data",
    initialState,
    reducers: {
        editMembersValue: (state, action) => {
            state.error = null
            state.isLoading = null
            state.data = action.payload
            state.deleteLoading = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;

            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(changeRole.pending, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(changeRole.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedMember = action.payload;
                const updatedIndex = state.data.findIndex((member) => member.email === updatedMember.email);
                if (updatedIndex !== -1) {
                    state.data[updatedIndex] = updatedMember;
                }
            })
            .addCase(changeRole.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(removeMember.pending, (state) => {
                state.isLoading = true;
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(removeMember.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteLoading = true;
                state.data = state.data.filter((member) => member.email !== action.payload);
            })
            .addCase(removeMember.rejected, (state, action) => {
                state.isLoading = false;
                state.deleteLoading = false;
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


export const changeRole = createAsyncThunk('members_data/changeRole', async ({ email, role }) => {
    const response = await changeMemberRole(email, { role: role })
    return response?.data;
})

export const removeMember = createAsyncThunk("members_data/removeMember", async ({ email }) => {
    await deleteMember(email)
    return email;
})
