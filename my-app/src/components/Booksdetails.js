import React from "react";
import "./styles/home.css";
import { Link } from "react-router-dom";

function Booksdetails({ book }) {
  return (
    <div className="book bg-dark">
      <div className="image">
        <img src={book.bookImage} alt="buu"></img>
      </div>
      <div className="infowrapper">
        <div className="info">
          <p>
            <strong>BookTitle:</strong>
            {book.bookTitle}
          </p>
          <p>
            <strong>BookAuthor:</strong>
            {book.bookAuthor}
          </p>
          <p>
            <strong>Description:</strong>
            {book.bookDescription}
          </p>
          <Link to={`/details/${book._id}`}>
            <button type="button" className="btn btn-warning">
              Read more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Booksdetails;
