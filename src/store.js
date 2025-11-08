import { configureStore } from "@reduxjs/toolkit";
import providersReducer from "./features/providers/providersSlice";

export const store = configureStore({
  reducer: {
    providers: providersReducer,
  },
});
