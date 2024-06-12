import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReverseCharge } from "../redux/slices/reverseChargeSlice";

const ReverseChargeToggle = () => {
  const dispatch = useDispatch();
  const isReverseCharge = useSelector(
    (state) => state.reverseCharge.isReverseCharge
  );

  const handleToggle = () => {
    dispatch(setReverseCharge(!isReverseCharge));
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="reverseChargeToggle"
        checked={isReverseCharge}
        onChange={handleToggle}
        className="w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded cursor-pointer"
      />
      <label
        htmlFor="reverseChargeToggle"
        className="text-sm text-gray-700 cursor-pointer"
      >
        Reverse Charge
      </label>
    </div>
  );
};

export default ReverseChargeToggle;
