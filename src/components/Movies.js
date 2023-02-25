import React, { useEffect, useState } from "react";
import { Card, Container, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./movies.css";
const Movies = () => {
  const [genre, setGenre] = useState([]);
  const [genreId, setGenreId] = useState(null);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [date, setDate] = useState(null);
  const [randomMovie, setRandomMovie] = useState(0);
  const handleGenreChange = (e) => {
    setGenreId(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const fetchMovie = () =>
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a61e05cef6501b04fdeb3f19c989cdb8&with_genres=${genreId}&sort_by=popularity.desc&primary_release_date.lte=${date}`
    )
      .then((response) => response.json())
      .then((response) => genreId && setMovieByGenre(response.results));

  const fetchGenre = () =>
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=a61e05cef6501b04fdeb3f19c989cdb8&language=en-US"
    )
      .then((response) => response.json())
      .then((response) => setGenre(response.genres));

  useEffect(() => {
    fetchGenre();
  }, []);
  const handleFilter = () => {
    fetchMovie();
  };
  const handleRandomMovies = () => {
    const randomIndex = Math.floor(Math.random() * movieByGenre.length);
    if (randomIndex === randomMovie) {
      randomIndex = randomIndex + 1;
    }
    setRandomMovie(randomIndex);
  };
  // useEffect(() => {
  //   fetchMovie();
  // }, [genreId]);
  return (
    <div className="movies">
      <div className="movies__container">
        <div className="movies__select">
          <div className="movies__selectFilter">
            <select
              name="filter"
              id="movie__genre"
              onChange={handleGenreChange}
            >
              {genre.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {" "}
                  {genre.name}{" "}
                </option>
              ))}
            </select>
            <input type="date" onChange={handleDate} />
            <button className="movies__filterButton" onClick={handleFilter}>
              filter
            </button>
          </div>
        </div>
        <div className="movies__displayContainer">
          {movieByGenre.length > 0 && (
            <div className="movies__display">
              <div className="display__header">
                <Container>
                  <Card>
                    <Card.Img
                      src={`https://image.tmdb.org/t/p/w500${movieByGenre[randomMovie].poster_path}`}
                      alt="Movie Cover"
                    />
                    <Card.Body>
                      <Card.Title>{movieByGenre[randomMovie].title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Container>
              </div>
              <div className="movie__border"></div>
              <div className="movie__carousel">
                <h2>YOU MIGHT ALSO LIKE:</h2>
                <Carousel>
                  {movieByGenre.map((movie) => {
                    return (
                      <Carousel.Item key={movie.id}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
        {/* <div className="movie__carousel">
          {movieByGenre.length > 0 && <h1>CAROUSEL DISPLAY</h1>}{" "}
        </div> */}
      </div>
    </div>
  );
};

export default Movies;
