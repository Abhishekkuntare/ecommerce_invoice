import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setInvoiceDetails } from "../redux/slices/invoiceDetailsSlice";
import { useNavigate } from "react-router-dom";
import ReverseChargeToggle from "./ReverseCharge";

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    invoiceNo: "",
    invoiceDetails: "",
    invoiceDate: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.invoiceNo) tempErrors.invoiceNo = "Invoice No. is required";
    if (!formData.invoiceDetails)
      tempErrors.invoiceDetails = "Invoice Details are required";
    if (!formData.invoiceDate)
      tempErrors.invoiceDate = "Invoice Date is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(setInvoiceDetails(formData));
      navigate("/itemdetails");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-bold mb-4">Invoice Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="invoiceNo"
            placeholder="Invoice No."
            value={formData.invoiceNo}
            onChange={handleChange}
            className="input"
          />
          {errors.invoiceNo && (
            <p className="text-red-500 text-xs">{errors.invoiceNo}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="invoiceDetails"
            placeholder="Invoice Details"
            value={formData.invoiceDetails}
            onChange={handleChange}
            className="input"
          />
          {errors.invoiceDetails && (
            <p className="text-red-500 text-xs">{errors.invoiceDetails}</p>
          )}
        </div>
        <div>
          <input
            type="date"
            name="invoiceDate"
            placeholder="Invoice Date"
            value={formData.invoiceDate}
            onChange={handleChange}
            className="input"
          />
          {errors.invoiceDate && (
            <p className="text-red-500 text-xs">{errors.invoiceDate}</p>
          )}
        </div>
        <ReverseChargeToggle />
      </div>
      <button type="submit" className="btn">
        Save Invoice Details
      </button>
    </form>
  );
};

export default InvoiceForm;
