/* eslint-disable react/prop-types */
import { useEffect } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import { useState } from "react";
import Pagination from "./Pagination";

const Movie = ({
  // eslint-disable-next-line react/prop-types
  handleAddToWatchlist,
  handleRemovefromwatchlist,
  watchlist,
}) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const handleprev = () => {
    if (pageNo === 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handlenext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=e3254c6dc594bdeaf65084d3fd0c88d7&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
      });
  }, [pageNo]);
  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending movies</div>

      <div className="flex flex-row justify-around flex-wrap gap-8">
        {movies.map((movieOb) => {
          return (
            <MovieCard
              key={movieOb.id}
              movieOb={movieOb}
              poster_path={movieOb.poster_path}
              name={movieOb.original_title}
              handleAddToWatchlist={handleAddToWatchlist}
              handleRemovefromwatchlist={handleRemovefromwatchlist}
              watchlist={watchlist}
            />
          );
        })}
      </div>
      <Pagination
        pageNo={pageNo}
        handlenext={handlenext}
        handleprev={handleprev}
      />
    </div>
  );
};

export default Movie;
