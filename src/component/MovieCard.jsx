import PropTypes from "prop-types";

const MovieCard = ({
  movieOb,
  poster_path,
  name,
  handleAddToWatchlist,
  handleRemovefromwatchlist,
  watchlist,
}) => {
  function doesContain(movieOb) {
    return watchlist.some((item) => item.id === movieOb.id);
  }

  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieOb) ? (
        <div
          onClick={() => handleRemovefromwatchlist(movieOb)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddToWatchlist(movieOb)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#128525;
        </div>
      )}
      <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60">
        {name}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movieOb: PropTypes.object.isRequired,
  poster_path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleAddToWatchlist: PropTypes.func.isRequired,
  handleRemovefromwatchlist: PropTypes.func.isRequired,
  watchlist: PropTypes.array.isRequired,
};

export default MovieCard;

// const MovieCard = ({ movieOb, handleAddToWatchlist }) => {
//   const { poster_path, original_title } = movieOb;

//   return (
//     <div
//       className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
//       style={{
//         backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
//       }}
//     >
//       <div
//         onClick={() => handleAddToWatchlist(movieOb)}
//         className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
//       >
//         &#128525;
//       </div>
//       <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60">
//         {original_title}
//       </div>
//     </div>
//   );
// };

// export default MovieCard;
