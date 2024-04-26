import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@/store/slices/auth.slice";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import { bookingsReducer } from "@/store/slices/bookings.slice";

const createNoopStorage = () => {
  return {
    getItem(_key: unknown) {
      return Promise.resolve(null);
    },
    setItem(_key: unknown, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem(_key: unknown) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined" ? createNoopStorage() : localStorage;

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  bookings: persistReducer(persistConfig, bookingsReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
