import React from "react";

import { useEffect, useState } from "react";
import "./styles/home.css";
import SearchIcon from "@mui/icons-material/Search";
import Header from "./Header";
import Booksdetails from "./Booksdetails";

function Home() {
  const [books, setBooks] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [searchQuerry, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://booko-com.onrender.com/books?p=${pageNumber}`
      );
      if (response.ok) {
        const jsonRes = await response.json();
        const jsonResArray = jsonRes.data.books;
        setBooks(jsonResArray);
        setTotalPages(jsonRes.totalPages);
      } else {
        console.error("Error fetching data:", response.status);
      }
    };

    fetchData();
  }, [pageNumber]);

  const handlePrev = () => {
    if (pageNumber > 0) {
      setpageNumber(pageNumber - 1);
    }
  };

  const HandleSearch = async (e) => {
    e.preventDefault();
    setpageNumber(0);
    const response = await fetch(
      `https://booko-com.onrender.com/books/search?title=${searchQuerry}`
    );
    if (response.ok) {
      const Res = await response.json();
      const ResArray = Res.data.books;
      setBooks(ResArray);
    } else {
      console.error("Error fetching data:", response.status);
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="HomeBody">
        <div className="HomeImage">
          <img
            src="https://lirp.cdn-website.com/e18c32b0/dms3rep/multi/opt/National+Read+a+Book+Day1+copy-1920w.jpg"
            className="fullWidthImage"
            alt="buk"
          />
        </div>
      </div>

      <div className="BookSection">
        <div className="header">
          <div className="title text-dark bg-warning">
            <h2>Books Suggestion</h2>
          </div>
        </div>
        <div className="searchSection">
          <div className="search-box">
            <form onSubmit={HandleSearch}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuerry}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="searchIcon bg-warning ">
                <SearchIcon />
              </div>
            </form>
          </div>
        </div>
        <div className="bookssec">
          <div className="bookwrapper">
            {books &&
              books.map((book) => <Booksdetails key={book._id} book={book} />)}
          </div>
        </div>
        <div className="Butt d-flex mt-3 mr-3 align-items-center justify-content-center">
          {totalPages > 1 && pageNumber < totalPages - 1 && (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setpageNumber(pageNumber + 1)}
            >
              Next
            </button>
          )}

          <button
            type="button"
            className="btn btn-warning"
            onClick={handlePrev}
            disabled={pageNumber === 0}
          >
            Prev
          </button>
        </div>
      </div>
      <div className="container-fluid bg-dark" id="footer">
        <p>&copy; 2023 Lewin99. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Home;
