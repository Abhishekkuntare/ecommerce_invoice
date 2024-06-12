import { createSlice } from "@reduxjs/toolkit";

export const shippingDetailsSlice = createSlice({
  name: "shippingDetails",
  initialState: {
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    stateCode: "",
  },
  reducers: {
    setShippingDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setShippingDetails } = shippingDetailsSlice.actions;
export default shippingDetailsSlice.reducer;
