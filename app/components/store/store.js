import { configureStore } from '@reduxjs/toolkit';
import versionReducer from './slices/versionSlice';
const store = configureStore({
    reducer: {
        version: versionReducer,
    },
});

export default store;