import { createSlice } from "@reduxjs/toolkit";

export const sellerDetailsSlice = createSlice({
  name: "sellerDetails",
  initialState: {
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    panNo: "",
    gstRegistrationNo: "",
  },
  reducers: {
    setSellerDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSellerDetails } = sellerDetailsSlice.actions;
export default sellerDetailsSlice.reducer;
