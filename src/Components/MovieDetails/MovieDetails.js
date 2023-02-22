import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { useParams } from "react-router-dom";
import "./MovieDetails.scss";
import Loading from "../Loading/Loading";
import Castlist from "../Castlist/Castlist";
import Movielist from "../Movieslist/Movieslist";

const MovieDetails = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const geItems = async () => {
      setLoading(true);
      let response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    geItems();
  }, [category, id]);
  return loading ? (
    <Loading />
  ) : (
    <>
      <div
        className="banner"
        style={{
          background: `url(${apiConfig.originalImage(
            item.backdrop_path || item.poster_path
          )}`,
        }}
      ></div>
      <div className=" container movie-content mb-4">
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
          <h2>Casts</h2>
          <div className="casts">
            <Castlist id={item.id}></Castlist>
          </div>
        </div>
      </div>

      <div className="similar p-4">
        <h2>similar</h2>
        <Movielist type="similar" id={item.id} category={category}></Movielist>
      </div>
    </>
  );
};

export default MovieDetails;
