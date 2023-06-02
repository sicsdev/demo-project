import { configureStore } from '@reduxjs/toolkit';
import versionReducer from './slices/versionSlice';
import botIdReducer from './slices/botIdSlice';
import userReducer from './slices/userSlice';
import memberReducer from './slices/memberSlice';
const store = configureStore({
    reducer: {
        version: versionReducer,
        botId: botIdReducer,
        user: userReducer,
        members: memberReducer,
    },
});

export default store;