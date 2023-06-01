import { configureStore } from '@reduxjs/toolkit';
import versionReducer from './slices/versionSlice';
import botIdReducer from './slices/botIdSlice';
import userInfoReducer from './slices/userInfoSlice';

const store = configureStore({
    reducer: {
        version: versionReducer,
        botId: botIdReducer,
        userInfo: userInfoReducer
    },
});

export default store;