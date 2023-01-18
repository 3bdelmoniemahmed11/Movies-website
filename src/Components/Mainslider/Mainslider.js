import React, { useState, useEffect, useRef } from "react";
import Button, { Outlinebutton } from "../Button/Button";
import apiConfig from "../../api/apiConfig";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "./Mainslider.scss";
import Modal, { ModalContent } from "../Modal/Modal";

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
          // autoplay={{ delay: 3000 }}
        >
          {movieItems.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                {/* attribue from swiper library that show the active slide  */}
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
        {movieItems.map((item, i) => {
          return <Trailer key={i} item={item} />;
        })}
      </section>
    </>
  );
};

const Slideitem = (props) => {
  const navigate = useNavigate();
  const item = props.item;
  const bg = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videos = await tmdbApi.getVideos(category.movie, item.id);
    // console.log(`the video is ${videos.results[0].key} `);
    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal_content>iframe")
        .setAttribute("src", videoSrc);
    } else modal.querySelector(".modal_content").innerHTML = "no tailer";
    modal.classList.toggle("active");
  };
  return (
    <>
      <div
        className={`slider-item ${props.className}`}
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="container item_content">
          <div className="row">
            <div className="col-lg-7 col-md-12 mb-4 d-flex align-items-center ">
              <div className="item-info">
                <h2 className="title">{item.title}</h2>
                <p className="overview mb-4">{item.overview}</p>
                <div className="btns">
                  <Button onClick={() => navigate("movie/" + item.id)}>
                    Watch now
                  </Button>
                  <Outlinebutton onClick={setModalActive}>
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
const Trailer = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.setAttribute("src", "");
  return (
    <>
      <Modal id={`modal_${item.id}`} active={false}>
        <ModalContent onClose={onClose}>
          <iframe
            ref={iframeRef}
            width="100%"
            height="500px"
            title="trailer"
          ></iframe>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Mainslider;
