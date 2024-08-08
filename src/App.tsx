import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home"; // Make sure the path is correct
import PokemonDetails from "./component/PokemonDetails"; // Make sure the path is correct
import "./index.css";

const App: React.FC = () => {
  return (
    <Router basename="/react-project-1">
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
