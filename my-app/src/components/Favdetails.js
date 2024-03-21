import React from "react";
import "./styles/favorites.css";

function Favdetails({ Fav, onDelete }) {
  const deleteFav = (id) => {
    fetch(`/favourites/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`removed successfully.`);
          onDelete(id);
        } else {
          console.error(`Error removing favorite book clicked.`);
        }
      })
      .catch((error) => {
        console.error(`An error occurred: ${error}`);
      });
  };

  return (
    <div className="Favbook container-fluid bg-dark">
      <div className="FavImage">
        <img src={Fav.bookImage} alt="buu"></img>
      </div>
      <div className="Favinfowrapper">
        <div className="Favinfo">
          <p>
            <strong>BookTitle:</strong>
            {Fav.bookTitle}
          </p>
          <p>
            <strong>BookAuthor:</strong>
            {Fav.bookAuthor}
          </p>

          <div className="FavDescription">
            <h2>Description</h2>
            <p>{Fav.bookDescription}</p>
          </div>
          <button
            type="button"
            onClick={() => deleteFav(Fav._id)}
            className="btn btn-warning"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Favdetails;
