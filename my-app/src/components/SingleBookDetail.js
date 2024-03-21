import React from "react";
import "./styles/details.css";

function singleBookDetail({ book }) {
  return (
    <div className="container-fluid">
      <div className="container bg-dark d-flex">
        <div className="image">
          <img src="https://i.ibb.co/rMdXnzT/buu.jpg" alt="buu"></img>
        </div>
        <div className="info">
          <div className="Heading">
            <h1>{book.bookTitle}</h1>
          </div>
          <div className="OtherInfo">
            <p>
              <strong>BookAuthor:</strong>F. Scott Fitzgerald
            </p>
            <p>
              <strong>Published:</strong>1960
            </p>
            <div>
              <h2>Description</h2>
              <div className="Decription">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  aliquam consectetur felis a tincidunt. Cras id mauris nisl.
                  Aliquam nec pharetra nunc. Nullam hendrerit metus quis elit
                  varius, at bibendum ex scelerisque. Donec efficitur libero id
                  enim hendrerit, ac tincidunt mi faucibus. Maecenas dictum
                  ligula non quam finibus, at congue nunc varius. Mauris aliquet
                  sem id quam pellentesque, id aliquam ligula fermentum. Fusce
                  placerat faucibus metus nec posuere. Nullam sodales odio at
                  odio pulvinar, eget placerat neque volutpat. Proin elementum
                  fermentum velit, a viverra ipsum tincidunt vel. Aliquam vitae
                  est libero. Curabitur ut augue nec massa dignissim tincidunt.
                  Suspendisse non velit justo. Maecenas sollicitudin ipsum nec
                  mauris volutpat, sit amet tempus massa scelerisque.
                </p>
              </div>
              <h2>Additional info:</h2>
              <div className="AddInfo">
                <p>
                  The story of Scout Finch's experiences growing up in the
                  racially divided town of Maycomb, Alabama.
                </p>
              </div>
              <div className="buttons">
                <div className="BackButton">
                  <button type="button" className="btn btn-warning">
                    Back To Home
                  </button>
                </div>
                <div className="BackButton">
                  <button type="button" className="btn btn-warning">
                    Save To Fav
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default singleBookDetail;
