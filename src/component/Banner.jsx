
const Banner = () => {
  const imageUrl =
    "https://parade.com/.image/t_share/MTk2OTQ2MTE1Mzk0ODA3NDM2/avengers-secret-wars.png"; // Use a valid image URL

  return (
    <div
      className="h-[20vh] md:h-[80vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    >
      <div className="text-white text-xl text-center w-full bg-blue-900/60 p-4">
        Avengers Endgame
      </div>
    </div>
  );
};

export default Banner;
