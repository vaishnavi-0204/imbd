import { useEffect, useState } from "react";
import "./App.css";
import Banner from "./component/Banner";
import Movie from "./component/Movie";
import Navbar from "./component/Navbar";
import WatchList from "./component/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [watchlist, setwatchlist] = useState([]);

  let handleAddToWatchlist = (movieOb) => {
    let newWatchList = [...watchlist, movieOb];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setwatchlist(newWatchList);
    console.log(newWatchList);
  };

  let handleRemovefromwatchlist = (movieOb) => {
    let filteredwatchList = watchlist.filter((movie) => {
      return movie.id != movieOb.id;
    });

    localStorage.setItem("moviesApp", JSON.stringify(filteredwatchList)); // moviesapp -the particular key here which  is targeting for deleting our watchlist from local storage.

    setwatchlist(filteredwatchList);
  };
  useEffect(() => {
    // Fetch watchlist data from localStorage
    const moviesFromLocalStorage = localStorage.getItem("moviesApp"); // key name -moviesApp

    // Check if there's any data in localStorage
    if (moviesFromLocalStorage) {
      // Parse the retrieved data and update the state
      setwatchlist(JSON.parse(moviesFromLocalStorage));
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />{" "}
                <Movie
                  handleAddToWatchlist={handleAddToWatchlist}
                  handleRemovefromwatchlist={handleRemovefromwatchlist}
                  watchlist={watchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchlist={watchlist}
                setwatchlist={setwatchlist}
                handleRemovefromwatchlist={handleRemovefromwatchlist}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
