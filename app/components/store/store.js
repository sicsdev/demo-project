import { configureStore } from '@reduxjs/toolkit';
import versionReducer from './slices/versionSlice';
import botIdReducer from './slices/botIdSlice';
import userReducer from './slices/userSlice';
const store = configureStore({
    reducer: {
        version: versionReducer,
        botId: botIdReducer,
        user: userReducer,
    },
});

export default store;