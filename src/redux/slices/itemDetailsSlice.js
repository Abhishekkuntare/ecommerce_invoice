import { createSlice } from "@reduxjs/toolkit";

export const itemDetailsSlice = createSlice({
  name: "itemDetails",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      newItem.netAmount =
        newItem.unitPrice * newItem.quantity - newItem.discount;
      newItem.taxType = calculateTaxType(
        newItem.placeOfSupply,
        newItem.placeOfDelivery
      );
      newItem.taxAmount = calculateTaxAmount(
        newItem.netAmount,
        newItem.taxType
      );
      newItem.totalAmount = newItem.netAmount + newItem.taxAmount;
      state.push(newItem);
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

// Helper function to calculate tax type
const calculateTaxType = (placeOfSupply, placeOfDelivery) => {
  if (placeOfSupply === placeOfDelivery) {
    return { cgst: 0.09, sgst: 0.09 }; // CGST & SGST at 9% each
  } else {
    return { igst: 0.18 }; // IGST at 18%
  }
};

// Helper function to calculate tax amount
const calculateTaxAmount = (netAmount, taxType) => {
  if (taxType.cgst && taxType.sgst) {
    const cgstAmount = netAmount * taxType.cgst;
    const sgstAmount = netAmount * taxType.sgst;
    return { cgst: cgstAmount, sgst: sgstAmount };
  } else if (taxType.igst) {
    return { igst: netAmount * taxType.igst };
  }
};

export const { addItem, removeItem } = itemDetailsSlice.actions;
export default itemDetailsSlice.reducer;
