import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import "./Castlist.scss";

const Castlist = (props) => {
  const { category } = useParams();
  const [Casts, setCasts] = useState([]);
  useEffect(() => {
    const getCredits = async () => {
      const response = await tmdbApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 5));
    };
    getCredits();
  }, [category, props.id]);
  return (
    <>
      {Casts.map((item, i) => {
        return (
          <div className="cast_item" key={i}>
            <div
              className="cast_img"
              style={{
                backgroundImage: `url(${apiConfig.w500Image(
                  item.profile_path
                )})`,
              }}
            ></div>
            <p className="cast_name">{item.name}</p>
          </div>
        );
      })}
    </>
  );
};

export default Castlist;
