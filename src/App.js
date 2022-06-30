import { Route, Routes } from "react-router-dom";
import "./App.css";
import CitySearch from "./pages/CitySearch";
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='search' element={<CitySearch/>} />
      </Routes>
    </div>
  );
}

export default App;
