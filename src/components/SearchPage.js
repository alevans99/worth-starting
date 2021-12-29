import { useState } from "react";
import "../styles/SearchPage.css";
import { searchForShow } from "../utils/api";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showsFound, setShowsFound] = useState([])

  const submitSearch = () => {
    searchForShow(searchQuery)
    .then((searchResult) => {
        setShowsFound(searchResult.data)
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
      
    </div>
  );
}

export default SearchPage;
