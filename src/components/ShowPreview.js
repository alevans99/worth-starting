import '../styles/ShowPreview.css';


function ShowPreview({showId, showImageSrc, showName}) {

  return (
    <div className="ShowPreview">
        <img src={showImageSrc} alt={`${showName} Poster`}></img>
        <h3>{showName}</h3>
    </div>
  );
}

export default ShowPreview;
