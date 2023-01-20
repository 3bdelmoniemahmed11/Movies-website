import React from "react";
import Mainslider from "../Mainslider/Mainslider";
import { NavLink } from "react-router-dom";
import { Outlinebutton } from "../Button/Button";
import Movieslist from "../Movieslist/Movieslist";
import { category, movieType, tvType } from "../../api/tmdbApi";

const Home = () => {
  return (
    <>
      <Mainslider />
      <div className="container-fluid">
        {/* popular movies  */}
        <div className="row  ">
          <div className="col-lg-12 d-flex justify-content-between mb-4">
            <h2>Trending Movies</h2>
            <NavLink to="/movie" className="ms-auto">
              <Outlinebutton className="small">View more</Outlinebutton>
            </NavLink>
          </div>
          <div className="row mb-4">
            <div className="col-lg-12">
              <Movieslist
                category={category.movie}
                type={movieType.popular}
              ></Movieslist>
            </div>
          </div>
        </div>
        {/* top rated movies  */}
        <div className="row ">
          <div className="col-lg-12 d-flex justify-content-between mb-4">
            <h2>Top Rated Movies</h2>
            <NavLink to="/movie" className="ms-auto">
              <Outlinebutton className="small">View more</Outlinebutton>
            </NavLink>
          </div>
          <div className="row mb-4">
            <div className="col-lg-12">
              <Movieslist
                category={category.movie}
                type={movieType.top_rated}
              ></Movieslist>
            </div>
          </div>
        </div>
        {/* Trending TV */}
        <div className="row ">
          <div className="col-lg-12 d-flex justify-content-between mb-4">
            <h2>Trending TV</h2>
            <NavLink to="/tv" className="ms-auto">
              <Outlinebutton className="small">View more</Outlinebutton>
            </NavLink>
          </div>
          <div className="row mb-4">
            <div className="col-lg-12">
              <Movieslist
                category={category.tv}
                type={tvType.popular}
              ></Movieslist>
            </div>
          </div>
        </div>
        {/* Top Rated TV */}
        <div className="row ">
          <div className="col-lg-12 d-flex justify-content-between mb-4">
            <h2>Top Rated TV</h2>
            <NavLink to="/tv" className="ms-auto">
              <Outlinebutton className="small">View more</Outlinebutton>
            </NavLink>
          </div>
          <div className="row mb-4">
            <div className="col-lg-12">
              <Movieslist
                category={category.tv}
                type={tvType.top_rated}
              ></Movieslist>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
