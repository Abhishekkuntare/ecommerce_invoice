import { createSlice } from "@reduxjs/toolkit";

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    orderNo: "",
    orderDate: "",
  },
  reducers: {
    setOrderDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
