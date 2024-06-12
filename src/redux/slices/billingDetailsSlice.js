import { createSlice } from "@reduxjs/toolkit";

export const billingDetailsSlice = createSlice({
  name: "billingDetails",
  initialState: {
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    stateCode: "",
  },
  reducers: {
    setBillingDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBillingDetails } = billingDetailsSlice.actions;
export default billingDetailsSlice.reducer;
