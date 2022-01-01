import "./App.css";

import SearchPage from "./components/pages/SearchPage";
import ShowPage from "./components/pages/ShowPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [showsDisplayed, setShowsDisplayed] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true)

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage showsDisplayed={showsDisplayed} setShowsDisplayed={setShowsDisplayed} firstLoad={firstLoad} setFirstLoad={setFirstLoad}/>} />
          <Route path="/show" element={<ShowPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
