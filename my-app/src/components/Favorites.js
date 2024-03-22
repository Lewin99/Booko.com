import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/favorites.css";
import Favdetails from "./Favdetails";
import { useMyContext } from "../Context/AutheticationContext";

function Favorites() {
  const [Favs, setFavs] = useState(null); // Start with null or another initial value
  const { AuthState, setAuthState } = useMyContext();

  const removeBookFromFavorites = (idToRemove) => {
    setFavs((prevFavs) => prevFavs.filter((book) => book._id !== idToRemove));
  };

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const response = await fetch(
          "https://booko-com.onrender.com/favourites/userfav",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${AuthState.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const jsonRes = await response.json();
          const jsonResArray = jsonRes.books;
          setFavs(jsonResArray);
        } else {
          console.error("Error fetching data:", response.status);
          setFavs([]);
        }
      } catch (error) {
        console.error("An error occurred during the fetch:", error);
        setFavs([]);
      }
    };

    fetchFav();
  }, []);

  return (
    <div>
      <Header />
      <div className="Heading text-dark bg-warning">
        <h2>Saved Books</h2>
      </div>
      <div className="FavBooksDiv">
        {Favs !== null ? (
          Favs.length > 0 ? (
            Favs.map((Favbook) => (
              <Favdetails
                key={Favbook._id}
                Fav={Favbook}
                onDelete={removeBookFromFavorites}
              />
            ))
          ) : (
            <div>
              <h1 className="NoFavHeading text-warning">
                No favorite books available
              </h1>
            </div>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Favorites;
