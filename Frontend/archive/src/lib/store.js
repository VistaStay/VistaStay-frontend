import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { hotelApi } from "./services/api";
import { searchSlice } from "./features/search/searchSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    search: searchSlice.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hotelApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
