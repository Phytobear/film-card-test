import Link from "next/link";
import Image from "next/image";

function FilmCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 m-4">
      <div className="relative h-96">
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-500">Directed by: {movie.director}</p>
        <p className="text-gray-600 text-sm mt-2">
          {movie.overview
            ? `${movie.overview.substring(0, 100)}...`
            : "No description available."}
        </p>
        <div className="flex items-center mt-3">
          <span className="text-yellow-500">
            {"★".repeat(Math.round(movie.vote_average / 2))}
            {"☆".repeat(5 - Math.round(movie.vote_average / 2))}
          </span>
          <span className="text-gray-600 text-sm ml-2">
            {movie.vote_average.toFixed(1)}/10
          </span>
        </div>
        <div className="mt-4 flex justify-between">
          <Link href={`/movies/${movie.id}`}></Link>
          <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
            Add to Favorites
          </button>
          <Link href={`/movies/${movie.id}`}>
            <p className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              View Details
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FilmCard;
