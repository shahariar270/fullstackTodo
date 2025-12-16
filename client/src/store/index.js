// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

const logger = createLogger({
    collapsed: true,
    diff: true
});

export const store = configureStore({
    reducer: {
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
});
