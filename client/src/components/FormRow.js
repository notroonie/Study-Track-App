import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText, className }) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
