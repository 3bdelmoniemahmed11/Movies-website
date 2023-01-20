import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi, { category } from "../../api/tmdbApi";
import Moviecard from "../Moviecard/Moviecard";
import "./Movieslist.scss";
const Movieslist = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let response = null;
    const params = {};
    const getList = async () => {
      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie: {
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          }
          default: {
            response = await tmdbApi.getTvList(props.type, { params });
            break;
          }
        }
      } else {
        response = await tmdbApi.similar(props.type, props.id);
      }
      setItems(response.results);
    };
    getList();
  }, [props.category, props.id, props.type]);
  return (
    <>
      <div className="movies-list">
        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
          {items.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <Moviecard item={item} category={props.category}></Moviecard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Movieslist;
