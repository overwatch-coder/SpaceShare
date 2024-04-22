import { Booking } from "@/types/index";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialBookState {
  bookings: Booking[] | null;
}

const initialState: InitialBookState = {
  bookings: null,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addToBookings: (state, action: PayloadAction<Booking>) => {
      state.bookings?.push(action.payload);
    },
  },
});

export const { addToBookings } = bookingsSlice.actions;

export const bookingsReducer = bookingsSlice.reducer;
