import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/details.css";
import { useParams } from "react-router-dom";
import { fetchBookDetails } from "../useHooks/fetchBookDetails";

function Details() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const [IsSaved, setSaved] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const bookData = await fetchBookDetails(id);
      setBook(bookData);
    };

    fetchBook();
  }, [id]);

  const HandleSaveBook = async () => {
    const dataObj = book.data.book;
    const data = {
      bookImage: dataObj.bookImage,
      bookTitle: dataObj.bookTitle,
      bookAuthor: dataObj.bookAuthor,
      bookDescription: dataObj.bookDescription,
    };

    try {
      const response = await fetch("/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const statusCode = response.status;

      if (statusCode === 200) {
        setButtonVisible(false);
        setSaved("The book has been Saved Succesively");
      } else if (statusCode === 409) {
        const errorData = await response.json();
        setError(errorData.message);
        setButtonVisible(false);
      } else {
        console.error("Request failed with status code: " + statusCode);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="container-fluid" id="detail-container">
        {book ? (
          <div className="container bg-dark d-flex justify-content-center align-items-center">
            <div className="d-none d-lg-block image">
              <img src={book.data.book.bookImage} alt="buu" />
            </div>

            <div className="info">
              <div className="Heading">
                <strong>
                  <h1 className="text-warning">{book.data.book.bookTitle}</h1>
                </strong>
              </div>
              <div className="OtherInfo">
                <strong>
                  <h5>Book Author:</h5>
                </strong>{" "}
                {book.data.book.bookAuthor}
                <div>
                  <strong>
                    <h5 className="text-warning">Description:</h5>
                  </strong>

                  <div className="Decription">
                    <p>{book.data.book.bookDescription}</p>
                  </div>
                  <strong>
                    <h5 className="text-warning">Additional info:</h5>
                  </strong>

                  <div className="AddInfo">
                    <p>{book.data.book.bookAdditionalInfo}</p>
                  </div>

                  {IsSaved && (
                    <div className="Saving d-flex  align-items-center text-warning p-4">
                      <h5>{IsSaved}!!!!!</h5>
                    </div>
                  )}
                  {error && (
                    <div className="ConflictError d-flex  align-items-center text-danger p-4">
                      <h5>{error}!!!!!</h5>
                    </div>
                  )}
                  <div className="buttons d-flex justify-content-center align-items-center">
                    <div className="BackButton">
                      <Link to={"/home"}>
                        <button type="button" className="btn btn-warning">
                          Back To Home
                        </button>
                      </Link>
                    </div>

                    <div className="BackButton">
                      {isButtonVisible && (
                        <button
                          type="button"
                          onClick={HandleSaveBook}
                          className="btn btn-warning"
                        >
                          Save To Fav
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Details;
