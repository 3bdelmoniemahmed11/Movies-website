import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button from "../Button/Button";
import Moviecard from "../../Components/Moviecard/Moviecard";
import Outlinebutton from "../../Components/Button/Button";
import "./Moviegrid.scss";
import Loading from "../Loading/Loading";

const Moviegrid = (props) => {
  const { keyword } = useParams();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getItems = async () => {
      /*three options:
            1-show the movies 
            2-shows the tv series 
            3-show the result of search*/
      //   console.log(keyword);
      setLoading(true);
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie: {
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          }
          default: {
            response = await tmdbApi.getTvList(tvType.popular, { params });
          }
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      // console.log(response.total_pages);
      setTotalPages(response.total_pages);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getItems();
  }, [keyword, props.category]);

  const loadMore = async () => {
    let response = null;
    let params = {
      page: page + 1,
    };
    if (keyword === undefined) {
      switch (props.category) {
        case category.movie: {
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        }
        default: {
          response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      }
    } else {
      params = {
        query: keyword,
        page: page + 1,
      };
      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };
  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="row mb-4">
        <div className="col-lg-6">
          {/* //the search section */}
          <Moviesearch category={props.category} keyword={keyword} />
        </div>
      </div>
      <div className="movie-grid">
        {items.map((item, i) => {
          return <Moviecard category={props.category} item={item} key={i} />;
        })}
      </div>
      {page < totalPages ? (
        <div className="text-center">
          <Outlinebutton className="small" onClick={loadMore}>
            Load more
          </Outlinebutton>
        </div>
      ) : null}
    </>
  );
};

const Moviesearch = (props) => {
  const navigate = useNavigate();
  const [keyword, setKeyWord] = useState(props.keyword ? props.keyword : "");
  const goToSearch = useCallback(() => {
    console.log(keyword);
    navigate(`/${category[props.category]}/search/${keyword}`);
  }, [props.category, keyword, navigate]);
  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  });

  return (
    <>
      <input
        type="text"
        placeholder="Enter your keyword"
        onChange={(e) => setKeyWord(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </>
  );
};

export default Moviegrid;
