import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText, className , rows,cols }) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <textarea 

        // type={type}
        value={value}
        name={name}
        id={name}
        rows={rows}
        cols={cols}
        // onChange={handleChange}
        className="form-textarea"
      />
    </div>
  );
};

export default FormRow;
