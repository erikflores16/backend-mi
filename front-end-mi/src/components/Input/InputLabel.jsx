import React from "react";

function InputLabel({ 
  label, 
  name, 
  placeholder, 
  id, 
  error, 
  type,
  onChange,
  value  
}) {
  return (
    <div className="form-group">
      <label htmlFor={id || name}>{label}</label>
      <input
        type={type || "text"}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}  
        className="form-input"
        value={value}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}

export default InputLabel;
