const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM1NTdjOTIyZjAwOTZlOTJiMjYxZjNhMmU5ODUyZCIsIm5iZiI6MTczNTIyNTAxMy4xNDEsInN1YiI6IjY3NmQ2ZWI1YmYxMGZmMTk4NDYxNDc3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1_zwN5Jb6_L0U8WI3-_2GizZ0yl_V7Jr63CueWIL4DE";

console.log("TMDB_API_KEY:", apiKey);

export const addFavorite = async (sessionId: string, accountId: string, movieId: number) => {
  const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    }),
  });

  const data = await response.json();
  return data;
};