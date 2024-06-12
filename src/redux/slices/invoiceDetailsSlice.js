import { createSlice } from "@reduxjs/toolkit";

export const invoiceDetailsSlice = createSlice({
  name: "invoiceDetails",
  initialState: {
    invoiceNo: "",
    invoiceDetails: "",
    invoiceDate: "",
  },
  reducers: {
    setInvoiceDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setInvoiceDetails } = invoiceDetailsSlice.actions;
export default invoiceDetailsSlice.reducer;
