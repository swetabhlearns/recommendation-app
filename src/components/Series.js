import React from "react";
import { useState, useEffect } from "react";
import { Card, Container, Carousel, Navbar, Nav } from "react-bootstrap";
import NavBar from "./NavBar";

import "./series.css";
const Series = () => {
  const [genre, setGenre] = useState([]);
  const [genreId, setGenreId] = useState(null);
  const [seriesByGenre, setSeriesByGenre] = useState([]);
  const [date, setDate] = useState(null);
  const [randomSeries, setRandomSeries] = useState(0);

  const handleGenreChange = (e) => {
    setGenreId(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const fetchMovie = () =>
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=a61e05cef6501b04fdeb3f19c989cdb8&language=en-US&with_genres=${genreId}&sort_by=vote_average.desc&vote_count.gte=10&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0&primary_release_date.lte=${date}`
    )
      .then((response) => response.json())
      .then((response) => genreId && setSeriesByGenre(response.results));

  const fetchGenre = () =>
    fetch(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=a61e05cef6501b04fdeb3f19c989cdb8&language=en-US"
    )
      .then((response) => response.json())
      .then((response) => setGenre(response.genres));

  useEffect(() => {
    fetchGenre();
  }, []);
  const handleFilter = () => {
    fetchMovie();
  };

  return (
    <div className="series">
      <NavBar />
      <div className="series__container">
        <div className="series__select">
          <div className="series__selectFilter">
            <select
              name="filter"
              id="series__genre"
              onChange={handleGenreChange}
            >
              <option value="" selected disabled hidden>
                Select Genre
              </option>
              {genre.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {" "}
                  {genre.name}{" "}
                </option>
              ))}
            </select>
            <input type="date" onChange={handleDate} />
            <button className="series__filterButton" onClick={handleFilter}>
              Search
            </button>
          </div>
        </div>
        <div className="movies__displayContainer">
          {seriesByGenre.length > 0 && (
            <div className="series__display">
              <div className="display__header">
                <Container>
                  <div className="movie__recommendation">
                    <h5>✨ Our Recommendation ✨</h5>
                  </div>
                  <Card>
                    <Card.Img
                      src={`https://image.tmdb.org/t/p/w500${seriesByGenre[randomSeries].poster_path}`}
                      alt="Movie Cover"
                    />
                  </Card>
                </Container>
              </div>
              <div className="movie__carousel">
                <h5>You might also like👀:</h5>
                <Carousel>
                  {seriesByGenre.map((series) => {
                    return (
                      <Carousel.Item key={series.id}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                          alt="thumbnail"
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Series;
