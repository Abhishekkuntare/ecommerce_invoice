import { configureStore } from "@reduxjs/toolkit";
import sellerDetailsReducer from "../slices/sellerDetailsSlice";
import billingDetailsReducer from "../slices/billingDetailsSlice";
import shippingDetailsReducer from "../slices/shippingDetailsSlice";
import orderDetailsReducer from "../slices/orderDetailsSlice";
import invoiceDetailsReducer from "../slices/invoiceDetailsSlice"; // Import the new reducer
import reverseChargeReducer from "../slices/reverseChargeSlice"; // Import the new reducer
import itemDetailsReducer from "../slices/itemDetailsSlice"; // Import the new reducer

export default configureStore({
  reducer: {
    sellerDetails: sellerDetailsReducer,
    billingDetails: billingDetailsReducer,
    shippingDetails: shippingDetailsReducer,
    orderDetails: orderDetailsReducer,
    invoiceDetails: invoiceDetailsReducer, // Add the new reducer to the store
    reverseCharge: reverseChargeReducer, // Add the new reducer to the store
    itemDetails: itemDetailsReducer, // Add the new reducer to the store
  },
});
