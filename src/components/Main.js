import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Books from "./Books";
import Movies from "./Movies";
import Series from "./Series";
import Music from "./Music";

const Main = () => {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/books" exact element={<Books />} />
          <Route path="/movies" exact element={<Movies />} />
          <Route path="/series" exact element={<Series />} />
          <Route path="/music" exact element={<Music />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
