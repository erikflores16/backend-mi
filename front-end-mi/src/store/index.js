import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import { useDispatch } from "react-redux";
import { authSlice } from "./authSlice";

const persistedConfig = {
  key: "Root",
  storage,
};

const reducers = combineReducers({
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistedConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const persistor = persistStore(store);

export const useApiDispatch = () => useDispatch();
