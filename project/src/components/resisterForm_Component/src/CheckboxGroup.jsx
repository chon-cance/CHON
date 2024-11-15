import React from "react";
import "./App.css";

const CheckboxGroup = ({ label }) => {
  return (
    <div className="checkbox-group">
      <label className="checkbox-label">
        <input type="checkbox" />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default CheckboxGroup;
