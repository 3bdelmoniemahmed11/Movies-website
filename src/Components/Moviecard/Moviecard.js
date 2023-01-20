import React from "react";
import { NavLink } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import { category } from "../../api/tmdbApi";
import Button from "../Button/Button";
import { BsPlayBtnFill } from "react-icons/bs";
import "./Moviecard.scss";

const Moviecard = (props) => {
  const item = props.item;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  const link = "/" + category[props.category] + "/" + item.id;
  return (
    <>
      <NavLink to={link}>
        <div className="movie-card" style={{ background: `url(${bg})` }}>
          <Button>
            <BsPlayBtnFill />
          </Button>
        </div>
        <h6>{item.title || item.name}</h6>
      </NavLink>
    </>
  );
};

export default Moviecard;
