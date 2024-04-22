import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@/store/slices/auth.slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { bookingsReducer } from "@/store/slices/bookings.slice";

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
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
