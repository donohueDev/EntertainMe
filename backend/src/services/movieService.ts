// service to be used when movie implementation is needed
import axios from 'axios';

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

// Function to fetch popular movies from TMDb
const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>('https://api.themoviedb.org/3/movie/popular', {
    params: {
      api_key: process.env.TMDB_API_KEY,
      language: 'en-US',
      page: 1
    }
  });
  return response.data.results;
};

export { getPopularMovies }; 