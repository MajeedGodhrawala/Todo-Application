import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, tasksReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
