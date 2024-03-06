import React from "react";

const Formbutton = ({ type, text }) => {
  return (
    <>
      <button className="signup-form-button" type={type}>
        {text}
      </button>
    </>
  );
};

export default React.memo(Formbutton);
