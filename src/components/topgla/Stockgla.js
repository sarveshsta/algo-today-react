import "./stockgla.css";
import React from "react";
import image from "../../assets/icons/Ellipse 30.png";

const Stockgla = () => {
  const GlaList = ["Top Gainer", "Top Losers", "Active"];
  const StockList = [
    {
      img: image,
      heading: "ADANIENSOL",
      para: "Adani enegry Solution ltd.",
      price: 872.65,
      change: "-3.05(-0.35%)",
    },
    {
      img: image,
      heading: "ADANIENSOL",
      para: "Adani enegry Solution ltd.",
      price: 872.65,
      change: "-3.05(-0.35%)",
    },
    {
      img: image,
      heading: "ADANIENSOL",
      para: "Adani enegry Solution ltd.",
      price: 872.65,
      change: "-3.05(-0.35%)",
    },
    {
      img: image,
      heading: "ADANIENSOL",
      para: "Adani enegry Solution ltd.",
      price: 872.65,
      change: "-3.05(-0.35%)",
    },
  ];

  return (
    <>
      <div className="Detailnav">
        <div className="glamain">
          {GlaList.map((item) => {
            return (
              <div className="listitem" key={item}>
                <h2 className="item">{item}</h2>
              </div>
            );
          })}
        </div>
        <div className="glasub">
          {StockList.map((item) => {
            const { img, heading, para, price, change } = item;
            return (
              <div className="StackCard">
                <div className="st-card-1">
                  <img className="stockimg" src={img} alt="" />
                </div>
                <div className="st-card-2">
                  <h2 className="stockheading">{heading}</h2>
                  <p className="stockpara">{para}</p>
                  <span className="stockprice">${price}</span>
                  <span className="stockchang">{change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default React.memo(Stockgla);
