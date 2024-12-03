 export function StrategyBox({ id, title, buttonText, onSubscribe, dataModal }) {
    return (
      <div className="subbox" id={id}>
        <h2 className="boxHeading">{title}</h2>
        <p className="boxpara">
          This Strategy will help you to trade on your end, Each stretegy has unique parameters like RSI, index, Pivot are many more. This indicators and strategy parameters will help you to gain a good profit
        </p>
        <button
          type="button"
          className="btn btn-primary"
          data-micromodal-trigger={dataModal}
          onClick={() => onSubscribe()}
        >
          {buttonText}
        </button>
      </div>
    );
  };