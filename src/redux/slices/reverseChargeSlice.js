import { createSlice } from "@reduxjs/toolkit";

export const reverseChargeSlice = createSlice({
  name: "reverseCharge",
  initialState: {
    isReverseCharge: false,
  },
  reducers: {
    setReverseCharge: (state, action) => {
      state.isReverseCharge = action.payload;
    },
  },
});

export const { setReverseCharge } = reverseChargeSlice.actions;
export default reverseChargeSlice.reducer;
