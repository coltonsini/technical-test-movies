export const fetchMovies = async (url: string) => {
  const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM1NTdjOTIyZjAwOTZlOTJiMjYxZjNhMmU5ODUyZCIsIm5iZiI6MTczNTIyNTAxMy4xNDEsInN1YiI6IjY3NmQ2ZWI1YmYxMGZmMTk4NDYxNDc3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1_zwN5Jb6_L0U8WI3-_2GizZ0yl_V7Jr63CueWIL4DE";

  console.log("TMDB_API_KEY:", apiKey); // Verifica que la API key se está cargando

  if (!apiKey) {
    console.error("TMDB_API_KEY is not defined");
    return [];
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    console.log("fetching movies from:", url);
    console.log("fetching movies with options:", options);
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status_message || "Failed to fetch");
    }

    return data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};