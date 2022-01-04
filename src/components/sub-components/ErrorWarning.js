import "../../styles/ErrorWarning.css";
import tv from "../../assets/television.png";

function ErrorWarning({ errorDisplayed, errorText, children }) {
  return (
    <div className="ErrorWarning">
      {errorDisplayed ? (
        <div className="error-container">
          <img className="placeholder-tv" src={tv} alt="tv"></img>
          <h2 className="error-text">{errorText}</h2>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default ErrorWarning;
