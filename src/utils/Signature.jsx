import React, { useState } from "react";
import { useSelector } from "react-redux";

export const SignatureComponent = () => {
  const [signature, setSignature] = useState(null);
  const sellerDetails = useSelector((state) => state.sellerDetails);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSignature(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <p className="text-lg font-semibold">{sellerDetails.name}</p>
      <label
        htmlFor="signature"
        className="block mt-4 border border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <span className="text-gray-600">Choose Signature</span>
        <input
          id="signature"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </label>
      <p className="mt-4 text-gray-600 italic">Authorized Signatory</p>
      {signature && (
        <img src={signature} alt="Signature" className="mt-4 max-w-[100px]" />
      )}
    </div>
  );
};
