// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import todoReducer from './todos'
import notificationReducer from './Notifications'

const logger = createLogger({
    collapsed: true,
    diff: true
});

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
});
