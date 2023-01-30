import React from "react";
import { useParams } from "react-router-dom";
import { category as cate } from "../../api/tmdbApi";
import bg from "../../assets/images/footer-bg.jpg";
import "./Catalog.scss";
import Moviegird from "../../Components/Moviegrid/Moviegrid";

const Catalog = () => {
  //the paramter in the navbar
  const { category } = useParams();

  return (
    <>
      <div className="page-header mb-4" style={{ background: `url(${bg})` }}>
        <h2>{category === cate.movie ? "Movies" : "TV Series"}</h2>
      </div>
      {/* the movies or tv series  */}
      <div className="container-fluid p-4">
        <Moviegird category={category}></Moviegird>
      </div>
    </>
  );
};

export default Catalog;
