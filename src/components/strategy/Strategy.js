import React from "react";
import './strategy.css'

const Strategy = () => {
  return (
    <div className="MyStrategy">

      <div className="strategy-1">
        <h1 className="strhead">Make Your Own Strategy</h1>
        <p className="strpara">
          This is a simple text-based strategy game. You can customize the rules
          to suit your preferences, or you can start with our basic
        </p>
        <div className="strategybtnn">
          <button type="submit" className="btn" style={{border:"1px solid blue", borderRadius:"15px"}}>
            Explore Now
          </button>
        </div>
      </div>

      <div className="strategy-1">
        <h1 className="strhead">Don't have own Follow Expert</h1>
        <p className="strpara">
          This is a simple text-based strategy game. You can customize the rules
          to suit your preferences, or you can start with our basic
        </p>
        <div className="strategybtnn">
          <button type="submit" className="btn" style={{border:"1px solid blue", borderRadius:"15px"}}>
            Explore Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default Strategy;
