import React from "react";

const Newshape = () => {
  return (
    <div className="new-shape-cust">
      <img
        className="green"
        src={require("../../../assets/icons/Ellipse 28.png")}
      />
    </div>
  );
};

export default React.memo(Newshape);
