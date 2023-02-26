import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./books.css";
const Books = () => {
  const [query, setQuery] = useState("");
  const [booksByAuthor, setBooksByAuthor] = useState([]);

  const fetchBooks = () =>
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${query}&orderBy=relevance&key=AIzaSyC4DwjSAHloLCgPENBiirscKViCdu36SC0`
    )
      .then((res) => res.json())
      .then((res) => setBooksByAuthor(res.items));

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
  const handleQueryClick = (e) => {
    e.preventDefault();
    if (query != "") {
      fetchBooks();
    }
    booksByAuthor.length > 0 && console.log(booksByAuthor[0].volumeInfo.title);
  };

  return (
    <div className="books">
      <div className="books__container">
        <div className="books__nav">
          <form className="books__search">
            <input
              type="text"
              placeholder="Name of Author"
              onChange={handleQueryChange}
              className="input-text"
            />
            <button
              className="books__btn"
              type="submit"
              onClick={handleQueryClick}
            >
              Search
            </button>
          </form>
        </div>
        {/* {booksByAuthor.length > 0 && (
            
          )} */}
        {booksByAuthor.length > 0 && (
          <div className="books__carousel__container">
            <div className="books__carousel">
              <Carousel>
                {booksByAuthor.map((book, i) => {
                  if (book.volumeInfo.imageLinks) {
                    console.log(book.volumeInfo.imageLinks.thumbnail, i);
                    return (
                      <Carousel.Item key={book.id}>
                        <img
                          src={book.volumeInfo.imageLinks.thumbnail}
                          alt="thumbnail"
                        />
                        <h3> {book.volumeInfo.title}</h3>
                      </Carousel.Item>
                    );
                  }
                })}
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
