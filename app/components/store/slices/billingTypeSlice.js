const { createSlice } = require("@reduxjs/toolkit");
const initialState = null
export const billingTypeSlice = createSlice({
    name: "faw",
    initialState,
    reducers: {
        editBillingType: (state, action) => {
            return action.payload
        },
    },
})

export const { editBillingType } = billingTypeSlice.actions;
export default billingTypeSlice.reducer;