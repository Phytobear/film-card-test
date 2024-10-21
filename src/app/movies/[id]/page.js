"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MoviePage({ params }) {
  const { id } = params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie data when the component mounts
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const accessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch movie data");
        }

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/3 h-96">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="md:ml-8 mt-4 md:mt-0">
            <p className="text-gray-700 mb-4">{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
