import React from "react";
import "./yourstrategy.css";
import { Link } from "react-router-dom";

const StrategyBox = ({ id, title, buttonText }) => {
  return (
    <div className="subbox" id={id}>
      <h2 className="boxHeading">{title}</h2>
      <p className="boxpara">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        interdum erat vel quam tincidunt, in luctus ex convallis. Nulla
        facilisi. Sed vestibulum velit sit amet ante tincidunt scelerisque.
      </p>
      <button type="button" className="btn btn-primary">
        {buttonText}
      </button>
    </div>
  );
};

const YourStrategy = () => {
  return (
    <div className="MainBox">
      <Link className="linking" to="/My-strategy">
        <StrategyBox id="box1" title="Strategy - 1" buttonText="Subscribe" />
      </Link>
      <StrategyBox id="box2" title="Strategy - 2" buttonText="Subscribe" />
      <StrategyBox id="box3" title="Strategy - 3" buttonText="Subscribe" />
      <StrategyBox id="box4" title="Strategy - 4" buttonText="Subscribe" />
      <StrategyBox id="box5" title="Strategy - 5" buttonText="Subscribe" />
      <StrategyBox id="box6" title="Strategy - 6" buttonText="Subscribe" />
      <StrategyBox id="box7" title="Strategy - 7" buttonText="Subscribe" />
      <StrategyBox id="box8" title="Strategy - 8" buttonText="Subscribe" />
    </div>
  );
};

export default React.memo(YourStrategy);
