import './App.css';

import SearchPage from './components/SearchPage'
import ShowPage from './components/ShowPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
  <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path="/" element={<SearchPage/>}/>
      <Route path="/show" element={<ShowPage/>}/>

    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
