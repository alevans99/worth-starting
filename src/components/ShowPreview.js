import '../styles/ShowPreview.css';


function ShowPreview({showImageSrc, showName}) {

  return (
    <div className="ShowPreview">
        <img src={showImageSrc}></img>
        <h3>{showName}</h3>
    </div>
  );
}

export default ShowPreview;
