import { configureStore } from '@reduxjs/toolkit';
import versionReducer from './slices/versionSlice';
import botIdReducer from './slices/botIdSlice';
const store = configureStore({
    reducer: {
        version: versionReducer,
        botId: botIdReducer,
    },
});

export default store;