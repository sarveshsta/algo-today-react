import React from "react";

const Formcomp = ({ type, placeholder, name, onChange, onBlur, value, maxLength }) => {
  return (
    <>
      <input
        className="signup-form-input"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        maxLength={maxLength}
      />
    </>
  );
};
export default React.memo(Formcomp);
