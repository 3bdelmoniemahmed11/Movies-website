import React, { Fragment, useEffect, useRef } from "react";
import logo from "../../assets/images/tmovie.png";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const headerRef = useRef(null);
  useEffect(() => {
    const headerShrink = () => {
      document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
        ? headerRef.current.classList.add("shrink")
        : headerRef.current.classList.remove("shrink");
    };
    window.addEventListener("scroll", headerShrink);
    return () => {
      window.addEventListener("scroll", headerShrink);
    };
  }, []);

  return (
    <Fragment>
      <section className="header">
        <nav ref={headerRef} className="navbar navbar-expand-lg  fixed-top">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <img className="logo" src={logo} alt="tv movies" />
              <span>tMovies</span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="#navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/movie">
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tv">
                    TV Series
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </Fragment>
  );
};

export default Header;
