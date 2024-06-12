import React from "react";
import { useSelector } from "react-redux";

const ItemList = () => {
  const items = useSelector((state) => state.itemDetails);

  // Helper function to calculate total tax amount
  const calculateTotalTaxAmount = (taxAmount) => {
    if (taxAmount.cgst && taxAmount.sgst) {
      return taxAmount.cgst + taxAmount.sgst;
    } else if (taxAmount.igst) {
      return taxAmount.igst;
    }
    return 0;
  };

  // Calculate total amount
  const totalAmount = items.reduce(
    (total, item) =>
      total + item.netAmount + calculateTotalTaxAmount(item.taxAmount),
    0
  );

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Item Details</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Unit Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Net Amount</th>
              <th className="px-4 py-2">Tax Type</th>
              <th className="px-4 py-2">Tax Amount</th>
              <th className="px-4 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">{item.unitPrice}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.discount}</td>
                <td className="border px-4 py-2">{item.netAmount}</td>
                <td className="border px-4 py-2">
                  {renderTaxType(item.taxType)}
                </td>
                <td className="border px-4 py-2">
                  {renderTaxAmount(item.taxAmount)}
                </td>
                <td className="border px-4 py-2">{totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper function to render tax type
const renderTaxType = (taxType) => {
  if (taxType.cgst && taxType.sgst) {
    const cgst = (taxType.cgst * 100).toFixed(2);
    const sgst = (taxType.sgst * 100).toFixed(2);
    return `CGST: ${cgst}%, SGST: ${sgst}%`;
  } else if (taxType.igst) {
    const igst = (taxType.igst * 100).toFixed(2);
    return `IGST: ${igst}%`;
  }
};

// Helper function to render tax amount
const renderTaxAmount = (taxAmount) => {
  if (taxAmount.cgst && taxAmount.sgst) {
    const cgst = taxAmount.cgst.toFixed(2);
    const sgst = taxAmount.sgst.toFixed(2);
    return `CGST: ${cgst}, SGST: ${sgst}`;
  } else if (taxAmount.igst) {
    const igst = taxAmount.igst.toFixed(2);
    return `IGST: ${igst}`;
  }
};

export default ItemList;
