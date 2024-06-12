import React, { useState } from "react";
import { useDispatch } from "react-redux";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceNo: "",
    invoiceDetails: "",
    invoiceDate: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setBillingDetails(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">invoiceNo</label>
        <input
          type="text"
          name="invoiceNo"
          value={formData.invoiceNo}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">invoiceDetails</label>
        <input
          type="text"
          name="invoiceDetails"
          value={formData.invoiceDetails}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">invoiceDate</label>
        <input
          type="text"
          name="invoiceDate"
          value={formData.invoiceDate}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
    </form>
  );
};

export default InvoiceForm;
