import { Link } from "react-router-dom";
import Logo from "../movie_logo_imbd.jpg";

const Navbar = () => {
  return (
    <div className="flex border space-x-8 items-center pl-3 py-4">
      <Link to="/">
        <img className="w-[60px] cursor-pointer" src={Logo} alt="Movies Logo" />
      </Link>
      <Link to="/" className="text-blue-600 text-3xl font-bold">
        Movies
      </Link>
      <Link to="/watchList" className="text-blue-600 text-3xl font-bold">
        WatchList
      </Link>
    </div>
  );
};

export default Navbar;
