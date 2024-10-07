 export function StrategyBox({ id, title, buttonText, onSubscribe, dataModal }) {
    return (
      <div className="subbox" id={id}>
        <h2 className="boxHeading">{title}</h2>
        <p className="boxpara">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          interdum erat vel quam tincidunt, in luctus ex convallis. Nulla
          facilisi. Sed vestibulum velit sit amet ante tincidunt scelerisque.
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