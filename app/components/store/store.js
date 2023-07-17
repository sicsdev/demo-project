import { configureStore } from '@reduxjs/toolkit';
import versionReducer from './slices/versionSlice';
import botIdReducer from './slices/botIdSlice';
import userReducer from './slices/userSlice';
import memberReducer from './slices/memberSlice';
import recommendationReducer from './slices/recommendation';

const store = configureStore({
    reducer: {
        version: versionReducer,
        botId: botIdReducer,
        user: userReducer,
        members: memberReducer,
        recommendation: recommendationReducer
    },
});

export default store;