import { useEffect, useState } from "react";
import genreids from "../utility/genre";

// eslint-disable-next-line react/prop-types
const WatchList = ({ watchlist, setwatchlist, handleRemovefromwatchlist }) => {
  // we add this handleRemovefromwatchlist as a props in the watchlist to make our delete button work in watchlist
  const [search, setSearch] = useState(""); // creating a state for search bar
  const [genreList, setGenreList] = useState(["All Genres"]); // to populate each genre according to user wish for that we use genrelist to give accoridng to genres

  // to work with current genre as all genre is selected to make working genre button on clickable
  const [currentGenre, setcurrGenre] = useState("All Genres"); // by default all genre

  let handleSearch = (e) => {
    setSearch(e.target.value);
  }; // when the handlersearch occur an event will occur  use e

  // handle filter is created for making the clicks over the genres are available in watchlist so that only blue color hiver only on selected genre button and gray over not selected.

  let handleFilter = (genre) => {
    setcurrGenre(genre);
  };

  let sortIncreasing = () => {
    // eslint-disable-next-line react/prop-types
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average; // it compares 2 movie on basis increasing order
    });
    setwatchlist([...sortedIncreasing]);
  };
  let sortDecreasing = () => {
    // eslint-disable-next-line react/prop-types
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setwatchlist([...sortedDecreasing]);
  };

  // this use effect take the genre and update the list of genre according to the genre the user selected .

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    let temp = watchlist.map((movieOb) => {
      // create a temperory variable  then map with movie ob where the genre id return you the first id mentioned with each movie.
      return genreids[movieOb.genre_ids[0]];
    });
    // we want only one button of genre not every time when the movie added to watchlist and its genre button laso pop up in the above of search bar.
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]); // it will be in array to make map work ovr the div because map always works over the arrays.
    console.log(temp);
  }, [watchlist]);

  // let sortin = () => {
  //   let sortedIn = watchlist.sort((movieA, movieB) => {
  //     return movieA.vote_average - movieB.vote_average; // it compares 2 movie on basis increasing order
  //   });
  //   setwatchlist([...sortedIn]);
  // };
  // let sortdec = () => {
  //   let sortedDec = watchlist.sort((movieA, movieB) => {
  //     return movieB.vote_average - movieA.vote_average;
  //   });
  //   setwatchlist([...sortedDec]);
  // };
  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre) => {
          // this genre list .map take each genre which is coming from the movies and make a button of that particular genres.
          return (
            // eslint-disable-next-line react/jsx-key
            <div
              onClick={() => handleFilter(genre)}
              className={
                currentGenre == genre
                  ? "mx-5 flex justify-center h-[3rem] w-[9rem] text-white font-bold items-center rounded-xl bg-blue-400 cursor-pointer"
                  : "mx-5 flex justify-center h-[3rem] w-[9rem] text-white font-bold items-center rounded-xl bg-gray-400/50 cursor-pointer"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="search movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 m-6">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr className="border-b-2">
              <th>Name</th>
              <th className="flex justify-center ">
                <div onClick={sortIncreasing} className="p-2">
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>

              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movieOb) => {
                if (currentGenre == "All Genres") {
                  return true;
                } else {
                  return genreids[movieOb.genre_ids[0]] == currentGenre; // if the genre matched with current genre of the selected button it will return that particular movie in list.
                }
              }) // add filter for genre based filteirng

              .filter((movieOb) => {
                // this filter is for searching bar acooridng to name of the movies
                return movieOb.title
                  .toLowerCase()
                  .includes(search.toLowerCase()); // compare the search string with movie titles
              })
              .map(
                (
                  movieOb // first filter the method and then apply mapping over the data
                ) => (
                  <tr key={movieOb.id} className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieOb.backdrop_path}`}
                      />
                      <div className="mx-10">{movieOb.title}</div>
                    </td>
                    <td>{movieOb.vote_average}</td>
                    <td>{movieOb.popularity}</td>
                    <td> {genreids[movieOb.genre_ids[0]]}</td>

                    <td
                      onClick={() => handleRemovefromwatchlist(movieOb)}
                      className="text-red-800"
                    >
                      Delete
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
