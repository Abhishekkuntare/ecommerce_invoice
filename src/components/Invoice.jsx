import React, { useRef } from "react";
import logo from "./logo.png";
import { useSelector } from "react-redux";
import { SignatureComponent } from "../utils/Signature";
import { numberToWords } from "../utils/NoOfWords";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const sellerDetails = useSelector((state) => state.sellerDetails);
  const billingDetails = useSelector((state) => state.billingDetails);
  const shippingDetails = useSelector((state) => state.shippingDetails);
  const orderDetails = useSelector((state) => state.orderDetails);
  const invoiceDetails = useSelector((state) => state.invoiceDetails);
  // Access item details, tax amount, and total amount from Redux store
  const items = useSelector((state) => state.itemDetails);

  const downloadPDF = () => {
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div
      ref={componentRef}
      className="max-w-4xl mx-auto bg-white p-4 sm:p-8 shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <img src={logo} alt="Amazon Logo" className="w-24" />
        <div className="text-right">
          <h2 className="text-xl font-bold">
            Tax Invoice/Bill of Supply/Cash Memo
          </h2>
          <p>(Original for Recipient)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-bold">Sold By:</p>
          <p>{sellerDetails.name}</p>
          <p>{sellerDetails.address}</p>
          <p>
            {sellerDetails.city}, {sellerDetails.state}, {sellerDetails.pincode}
          </p>
          <p>IN</p>
          <p>PAN No: {sellerDetails.panNo}</p>
          <p>GST Registration No: {sellerDetails.gstRegistrationNo}</p>
        </div>
        <div>
          <p className="font-bold">Billing Address:</p>
          <p>{billingDetails.name}</p>
          <p>{billingDetails.address}</p>
          <p>
            {billingDetails.city}, {billingDetails.state},{" "}
            {billingDetails.pincode}
          </p>
          <p>IN</p>
          <p>State/UT Code: {billingDetails.stateCode}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-bold">Shipping Address:</p>
          <p>{shippingDetails.name}</p>
          <p>{shippingDetails.address}</p>
          <p>
            {shippingDetails.city}, {shippingDetails.state},{" "}
            {shippingDetails.pincode}
          </p>
          <p>IN</p>
          <p>State/UT Code: {shippingDetails.stateCode}</p>
          <p>Place of supply: {shippingDetails.state}</p>
          <p>Place of delivery: {shippingDetails.state}</p>
        </div>
        <div>
          <p>Order Number: {orderDetails.orderNo}</p>
          <p>Order Date: {orderDetails.orderDate}</p>
          <p>Invoice Number : {invoiceDetails.invoiceNo}</p>
          <p>Invoice Details : {invoiceDetails.invoiceDetails}</p>
          <p>Invoice Date : {invoiceDetails.invoiceDate}</p>
        </div>
      </div>

      <table className="w-full mt-4">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left text-[14px]">Sl. No</th>
            <th className="py-2 text-left text-[14px]">Description</th>
            <th className="py-2 text-left text-[14px]">Unit Price</th>
            <th className="py-2 text-left text-[14px]">Qty</th>
            <th className="py-2 text-left text-[14px]">Net Amount</th>
            <th className="py-2 text-left text-[14px]">Tax Rate</th>
            <th className="py-2 text-left text-[14px]">Net Type</th>
            <th className="py-2 text-left text-[14px]">Tax Amount</th>
            <th className="py-2 text-left text-[14px]">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{item.description}</td>
              <td className="py-2">₹{item.unitPrice}</td>
              <td className="py-2">{item.quantity}</td>
              <td className="py-2">₹{item.netAmount}</td>
              <td className="py-2">{"2.5%"}</td>
              <td className="py-2">CGST</td>
              <td className="py-2">
                ₹
                {item.taxAmount
                  ? Object.values(item.taxAmount)
                      .map((amount) => parseFloat(amount).toFixed(2))
                      .join(", ")
                  : "-"}
              </td>
              <td className="py-2">
                ₹{parseFloat(item.totalAmount).toFixed(2)}
              </td>{" "}
              {/* Ensure totalAmount is a scalar value */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Amount in Words</h1>
        {items.map((item, index) => (
          <p key={index} className="font-semibold mb-2">
            ₹{parseFloat(item.totalAmount).toFixed(2)} :{" "}
            {numberToWords(parseFloat(item.totalAmount).toFixed(2))}
          </p>
        ))}
        <p className="font-semibold mt-4">
          Total Final Value: ₹
          {items
            .reduce((total, item) => total + parseFloat(item.totalAmount), 0)
            .toFixed(2)}
        </p>
      </div>

      <div>
        <SignatureComponent />
      </div>
      <button
        onClick={downloadPDF}
        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-10"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Invoice;
