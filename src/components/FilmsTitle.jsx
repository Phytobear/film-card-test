import Link from "next/link";
import Image from "next/image";

export default function FilmsTile({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 m-4">
      <Link href={`/movies/${movie.id}`}>
        <div className="relative h-96">
          <Image
            src={imageUrl}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{movie.title}</h2>
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
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            View Details
          </button>
        </div>
      </Link>
    </div>
  );
}
