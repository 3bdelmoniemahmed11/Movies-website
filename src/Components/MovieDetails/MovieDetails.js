import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { useParams } from "react-router-dom";
import "./MovieDetails.scss";

const MovieDetails = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState([]);
  useEffect(() => {
    const geItems = async () => {
      let response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      console.log(response);
    };

    geItems();
  }, [category, id]);
  return (
    <>
      <div
        className="banner"
        style={{
          background: `url(${apiConfig.originalImage(
            item.backdrop_path || item.poster_path
          )}`,
        }}
      ></div>
      <div className=" container movie-content">
        <div className="img-wrapper">
          <div
            className="img-poster"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(
                item.poster_path || item.backdrop_path
              )})`,
            }}
          ></div>
        </div>
        <div className="movie-info">
          <h2 className="title">{item.title}</h2>
          <div className="genres">
            {item.genres &&
              item.genres.map((gener, i) => {
                return (
                  <span className="genres-item" key={i}>
                    {gener.name}
                  </span>
                );
              })}
          </div>
          <p className="overview">{item.overview}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
