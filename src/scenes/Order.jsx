// BillingForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setBillingDetails } from "./billingDetailsSlice";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    orderNo: "",
    orderDate: "",
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
        <label className="block text-sm font-medium">orderNo</label>
        <input
          type="text"
          name="orderNo"
          value={formData.orderNo}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">orderDate</label>
        <input
          type="text"
          name="orderDate"
          value={formData.orderDate}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
    </form>
  );
};

export default OrderForm;
