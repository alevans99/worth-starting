import { useState } from "react";
import "../styles/SearchPage.css";
import { searchForShow } from "../utils/api";
import ShowPreview from "./ShowPreview";
import notFound from "../assets/not-found.jpeg"
function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showsDisplayed, setShowsDisplayed] = useState([])
  const [showsHidden, setShowsHidden] = useState([])


  const submitSearch = () => {
    searchForShow(searchQuery)
    .then((searchResult) => {
        if (searchResult.data.length > 20){
            setShowsDisplayed(searchResult.data.slice(0,20).map((result) => {return result.show}))
            setShowsHidden(searchResult.data.slice(20).map((result) => {return result.show}))
        } else {
            setShowsDisplayed(searchResult.data.map((result) => {return result.show}))
        }



    })
    .catch((err) => {
        console.log("Error With Search " + err)
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
        <button className="search-submit-button" onClick={() => {
            submitSearch()
        }}>Search</button>
      </div>

        <div className="search-result-container">
        {showsDisplayed.map((show, index) => {
            console.log(show)
            let showImageSrc = notFound
            if (show.image !== null && show.image.medium !== null){
                showImageSrc = show.image.medium
            }
            return <ShowPreview key={`${show.name}${index}`} showId={show.id} showImageSrc={showImageSrc} showName={show.name}></ShowPreview>
        })}

        </div>


    </div>
    


  );
}

export default SearchPage;
