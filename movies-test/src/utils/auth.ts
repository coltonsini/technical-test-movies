const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGM1NTdjOTIyZjAwOTZlOTJiMjYxZjNhMmU5ODUyZCIsIm5iZiI6MTczNTIyNTAxMy4xNDEsInN1YiI6IjY3NmQ2ZWI1YmYxMGZmMTk4NDYxNDc3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1_zwN5Jb6_L0U8WI3-_2GizZ0yl_V7Jr63CueWIL4DE";

console.log("TMDB_API_KEY:", apiKey);

export const createSession = async () => {
  const requestTokenResponse = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`);
  const requestTokenData = await requestTokenResponse.json();
  const requestToken = requestTokenData.request_token;

  const sessionResponse = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ request_token: requestToken }),
  });

  const sessionData = await sessionResponse.json();
  return sessionData.session_id;
};