import React from "react";
import { useState, useEffect } from "react";
import { Card, Container, Carousel } from "react-bootstrap";

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
  const handleRandomSeries = () => {
    let randomIndex = Math.floor(Math.random() * seriesByGenre.length);
    setRandomSeries(randomIndex);
  };

  return (
    <div className="series">
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
              filter
            </button>
          </div>
        </div>
        <div className="movies__displayContainer">
          {seriesByGenre.length > 0 && (
            <div className="series__display">
              <div className="display__header">
                <h1>{seriesByGenre[randomSeries].name}</h1>
                <Container>
                  <Card>
                    <Card.Img
                      src={`https://image.tmdb.org/t/p/w500${seriesByGenre[randomSeries].poster_path}`}
                      alt="Movie Cover"
                    />
                    <Card.Body>
                      <Card.Title>
                        {seriesByGenre[randomSeries].name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                  <div className="movie__recommendation">
                    <h5>✨ Our Recommendation ✨</h5>
                  </div>
                </Container>
              </div>
              <div className="movie__carousel">
                <h2>YOU MIGHT ALSO LIKE:</h2>
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
              <div className="display__button">
                <button onClick={handleRandomSeries}>
                  NEXT RECOMMENDATION
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Series;
