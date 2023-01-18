import React, { useState, useEffect } from "react";
import Button, { Outlinebutton } from "../Button/Button";
import apiConfig from "../../api/apiConfig";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Mainslider.scss";

const Mainslider = () => {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };

      console.log("try is fired");
      const response = await tmdbApi.getMoviesList(movieType.popular, {
        params,
      });

      setMovieItems(response.results.slice(1, 4));
      console.log(response);
    };
    getMovies();
  }, []);

  return (
    <>
      <section className="main-slider">
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
        >
          {movieItems.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                {({ isActive }) => (
                  <Slideitem
                    item={item}
                    className={`${isActive ? "active" : ""}`}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </>
  );
};

const Slideitem = (props) => {
  const item = props.item;
  const bg = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  return (
    <>
      <div
        className={`slider-item ${props.className}`}
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="container item_content">
          <div className="row">
            <div className="col-lg-7 mb-4 d-flex align-items-center ">
              <div className="item-info">
                <h2 className="title">{item.title}</h2>
                <p className="overview">{item.overview}</p>
                <div className="btns">
                  <Button onClick={() => console.log("clicked1")}>
                    Watch now
                  </Button>
                  <Outlinebutton onClick={() => console.log("clicked2")}>
                    Watch trailer
                  </Outlinebutton>
                </div>
              </div>
            </div>
            <div className="col-lg-5 img-wrapper">
              <img
                className="img-poster"
                src={apiConfig.w500Image(item.poster_path)}
                alt=".."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Mainslider;
