import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../redux/slices/orderDetailsSlice";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderNo: "",
    orderDate: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.orderNo) tempErrors.orderNo = "Order No. is required";
    if (!formData.orderDate) tempErrors.orderDate = "Order Date is required";
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
      dispatch(setOrderDetails(formData));
      navigate("/invoice");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-bold mb-4">Order Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="orderNo"
            placeholder="Order No."
            value={formData.orderNo}
            onChange={handleChange}
            className="input"
          />
          {errors.orderNo && (
            <p className="text-red-500 text-xs">{errors.orderNo}</p>
          )}
        </div>
        <div>
          <input
            type="date"
            name="orderDate"
            placeholder="Order Date"
            value={formData.orderDate}
            onChange={handleChange}
            className="input"
          />
          {errors.orderDate && (
            <p className="text-red-500 text-xs">{errors.orderDate}</p>
          )}
        </div>
      </div>
      <button type="submit" className="btn">
        Save Order Details
      </button>
    </form>
  );
};

export default OrderForm;
