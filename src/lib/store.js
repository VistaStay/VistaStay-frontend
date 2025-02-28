import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./api/features/userSlice"; // Adjust the import path if needed

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

setupListeners(store.dispatch);
