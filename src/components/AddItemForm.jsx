import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/itemDetailsSlice";
import ItemList from "./ItemList";
import { Link } from "react-router-dom";

const AddItemForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    description: "",
    unitPrice: "",
    quantity: "",
    discount: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message when user starts typing again
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      // If no errors, dispatch action to add item
      dispatch(addItem(formData));
      // Clear form fields after adding item
      setFormData({
        description: "",
        unitPrice: "",
        quantity: "",
        discount: "",
      });
    } else {
      // If errors, set error state to display error messages
      setErrors(formErrors);
    }
  };

  // Function to validate form fields
  const validateForm = (data) => {
    let errors = {};
    if (!data.description) {
      errors.description = "Description is required";
    }
    if (!data.unitPrice) {
      errors.unitPrice = "Unit Price is required";
    }
    if (!data.quantity) {
      errors.quantity = "Quantity is required";
    }
    if (!data.discount) {
      errors.discount = "Discount is required";
    }
    return errors;
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md"
      >
        <h2 className="text-lg font-bold mb-4">Add Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="input"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="unitPrice"
              placeholder="Unit Price"
              value={formData.unitPrice}
              onChange={handleChange}
              className="input"
            />
            {errors.unitPrice && (
              <p className="text-red-500">{errors.unitPrice}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="input"
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="discount"
              placeholder="Discount"
              value={formData.discount}
              onChange={handleChange}
              className="input"
            />
            {errors.discount && (
              <p className="text-red-500">{errors.discount}</p>
            )}
          </div>
        </div>
        <button type="submit" className="btn mr-8">
          Add Item
        </button>
        <Link to="/checkout" className="btn">
          Invoice form
        </Link>
      </form>

      <ItemList />
    </div>
  );
};

export default AddItemForm;
