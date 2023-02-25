import React from "react";
import { useNavigate } from "react-router";
import "./home.css";
const Home = () => {
  const navigate = useNavigate();
  const homeClickHandler = (e) => {
    console.log(e.target.innerText);
    navigate(`${e.target.innerText.toLowerCase()}`);
  };
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__select">
          <div className="home__selectButton" onClick={homeClickHandler}>
            Books
          </div>
          <div className="home__selectButton" onClick={homeClickHandler}>
            Movies
          </div>
          <div className="home__selectButton" onClick={homeClickHandler}>
            Series
          </div>
          <div className="home__selectButton" onClick={homeClickHandler}>
            Music
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
