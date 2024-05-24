import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../reducers";

const store = configureStore({
  reducer: tasksReducer,
});

export default store;
