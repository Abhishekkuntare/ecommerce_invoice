import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSellerDetails } from "../redux/slices/sellerDetailsSlice";
import { useNavigate } from "react-router-dom";

const SellerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    panNo: "",
    gstRegistrationNo: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.state) tempErrors.state = "State is required";
    if (!formData.pincode) tempErrors.pincode = "Pincode is required";
    if (!formData.panNo) tempErrors.panNo = "PAN No. is required";
    if (!formData.gstRegistrationNo)
      tempErrors.gstRegistrationNo = "GST Registration No. is required";
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
      dispatch(setSellerDetails(formData));
      navigate("/billing");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-bold mb-4">Seller Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="input"
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="input"
          />
          {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
        </div>
        <div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="input"
          />
          {errors.state && (
            <p className="text-red-500 text-xs">{errors.state}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="input"
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs">{errors.pincode}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="panNo"
            placeholder="PAN No."
            value={formData.panNo}
            onChange={handleChange}
            className="input"
          />
          {errors.panNo && (
            <p className="text-red-500 text-xs">{errors.panNo}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="gstRegistrationNo"
            placeholder="GST Registration No."
            value={formData.gstRegistrationNo}
            onChange={handleChange}
            className="input"
          />
          {errors.gstRegistrationNo && (
            <p className="text-red-500 text-xs">{errors.gstRegistrationNo}</p>
          )}
        </div>
      </div>
      <button type="submit" className="btn">
        Save Seller Details
      </button>
    </form>
  );
};

export default SellerForm;
