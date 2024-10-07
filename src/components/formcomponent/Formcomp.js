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

export const Formcomp1 = ({ type, placeholder, name, onChange, onBlur, value, maxLength,className }) => {
  return (
    <>
      <input
        className={className}
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
