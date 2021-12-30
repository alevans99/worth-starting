import { Link } from "react-router-dom";
import "../styles/ShowPreview.css";

function ShowPreview({ showId, showImageSrc, showName }) {
  //Adds the ID as a query to the link for each Show Preview card. This allows
  //us to access it in the Show Page.
  const showPath = { pathname: "/show", search: `?q=${showId}` };

  return (
    <Link to={showPath}>
      <div
        className="ShowPreview"
        onClick={() => {
          console.log(showId);
        }}
      >
        <img src={showImageSrc} alt={`${showName} Poster`}></img>
        <h3>{showName}</h3>
      </div>
    </Link>
  );
}

export default ShowPreview;
