import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice"
import { api } from "state/api"
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from '../state/index'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig,authReducer );
export const store = configureStore({
  reducer: {
    auth:persistedReducer,

    appState: appStateSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});
