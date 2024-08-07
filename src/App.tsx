import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./component/Home";
import PokemonDetails from "./component/PokemonDetails";
import "./index.css";


const App: React.FC = () => {
  return (
    <Router>
      <div id="wrapper" className="bg-red-600 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
  