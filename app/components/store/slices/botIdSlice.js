import { getAllBotData, getAllWidgetData, getBotAllData, getBotWidget } from "@/app/API/pages/Bot";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = { id: null, botData: { isLoading: false, data: null, error: null }, showModal: false }

export const botIdSlice = createSlice({
    name: "bot_id",
    initialState,
    reducers: {
        setBotId: (state, action) => {
            state.id = action.payload
        },
        setModalValue: (state, action) => { 
            state.showModal = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBot.pending, (state) => {
                state.botData.isLoading = true;
                state.botData.error = null;
            })
            .addCase(fetchBot.fulfilled, (state, action) => {
                state.botData.isLoading = false;
                state.botData.data = action.payload;
                if (action.payload.main_bot_data.results.length === 0) {
                    state.showModal = true
                }

            })
            .addCase(fetchBot.rejected, (state, action) => {
                state.botData.isLoading = false;
                state.botData.error = action.error.message;
            });
    },
})

export const { setBotId, setModalValue } = botIdSlice.actions;
export default botIdSlice.reducer;


export const fetchBot = createAsyncThunk('bot_id/fetchBotData', async () => {
    const response = await getBotAllData()
    if (response.results.length > 0) {
        const ids = response.results.map(element => element.id)
        const widgets = await getAllWidgetData(ids)  
        const bots = await getAllBotData(ids)  
        return {
            main_bot_data : response,
            widgets : widgets.map(element=>element.data),
            bots : bots.map(element=>element.data),
        }
    }
    return {
        main_bot_data : response,
        widgets : null,
        bots : null,
    }
});
