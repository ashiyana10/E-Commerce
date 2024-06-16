import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./Reducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["register"],
};

const reducer = combineReducers({
  productSlice,
});

const persistReducers = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: {
    persistReducers,
  },
});

export default store;
