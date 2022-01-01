import { useState } from "react";
import "../../styles/SearchPage.css";
import { searchForShow } from "../../utils/api";
import ShowPreview from "../sub-components/ShowPreview";
import notFound from "../../assets/not-found.jpeg"
import tv from "../../assets/television.png"
import LoadingSpinner from "../sub-components/LoadingSpinner";
import ErrorWarning from "../sub-components/ErrorWarning";
import { imageCheck } from "../../utils/utils";

function SearchPage({showsDisplayed, setShowsDisplayed, firstLoad, setFirstLoad}) {
  const [searchQuery, setSearchQuery] = useState("");
  // const [showsDisplayed, setShowsDisplayed] = useState([])
  const [showsHidden, setShowsHidden] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [errorDisplayed, setErrorDisplayed] = useState(false)
  const errorText = "There was an error retrieving results."

  const submitSearch = () => {
    setFirstLoad(false)
    setErrorDisplayed(false)
    setSearchLoading(true)
    searchForShow(searchQuery)
    .then((searchResult) => {
        if (searchResult.data.length > 20){
            setShowsDisplayed(searchResult.data.slice(0,20).map((result) => {return result.show}))
            setShowsHidden(searchResult.data.slice(20).map((result) => {return result.show}))
        } else {
            setShowsDisplayed(searchResult.data.map((result) => {return result.show}))
        }

        setSearchLoading(false)


    })
    .catch((err) => {
        setSearchLoading(false)
        setErrorDisplayed(true)

    })
  }
  
  return (
    <div className="SearchPage">
      <header>
        <h1>Worth Starting?</h1>
        <p>
          Search for a TV series to see whether there is a ratings drop-off and
          decide whether it's worth starting!
        </p>
      </header>

      <div className="search-container">
        <input className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        ></input>
        <button className="button" onClick={() => {
            submitSearch()
        }}>Search</button>
      </div>
      <ErrorWarning errorDisplayed={errorDisplayed} errorText={errorText}></ErrorWarning>
        <LoadingSpinner isLoading={searchLoading}>
        <div className="search-result-container">
          {firstLoad && showsDisplayed.length < 1? <img className="placeholder-tv" alt="television" src={tv}></img> : null}
        {showsDisplayed.length < 1 && !firstLoad && !errorDisplayed? <h2 className="no-results-text">No Results Found</h2> : showsDisplayed.map((show, index) => {
           
            let showImageSrc = notFound
            if (imageCheck(show)){
              showImageSrc = show.image.medium
          }
            return <ShowPreview key={`${show.name}${index}`} showId={show.id} showImageSrc={showImageSrc} showName={show.name}></ShowPreview>
        }) }

        </div>
        </LoadingSpinner>

    </div>
    


  );
}

export default SearchPage;
