import FilmCard from "@/components/FilmCard";

export default async function AllFilmsPage() {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;

  const res = await fetch(`https://api.themoviedb.org/3/movie/popular`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();
  const movies = data.results;

  // Fetch director for each movie
  const moviesWithDirector = await Promise.all(
    movies.map(async (movie) => {
      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );

      if (creditsRes.ok) {
        const creditsData = await creditsRes.json();
        const director = creditsData.crew.find(
          (member) => member.job === "Director"
        );
        return { ...movie, director: director?.name || "Unknown" };
      } else {
        return { ...movie, director: "Unknown" };
      }
    })
  );

  return (
    <main className="bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-500 min-h-screen">
      <h1 className="text-3xl font-bold text-center pt-8">All Films</h1>
      <div className="flex flex-wrap justify-center mt-8">
        {moviesWithDirector.map((movie) => (
          <FilmCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
