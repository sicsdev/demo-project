import { submitLogin } from "@/app/API/pages/Login";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const initialState = { userData: null }


export const userInfoSlice = createSlice({
    name: "user_id",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.userData = action.payload;
        });
    },
})

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

export const userLogin = createAsyncThunk(
    "userInfo/userLogin",
    async (body) => {
        const response = await submitLogin(body);
        return response;
    }
);