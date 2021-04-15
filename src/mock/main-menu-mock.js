const getMoviesOnWatchlist = (moviesInfo) => moviesInfo.filter((movie) => movie.isOnWatchlist);
const getWatchedMovies = (moviesInfo) => moviesInfo.filter((movie) => movie.isWatched);
const getFavoriteMovies = (moviesInfo) => moviesInfo.filter((movie) => movie.isFavorite);

const moviesFilters = new Map ( [
  ['All', (moviesInfo) => moviesInfo],
  ['Watchlist', getMoviesOnWatchlist],
  ['History', getWatchedMovies],
  ['Favorites', getFavoriteMovies],
]);

export const generateFilters = (moviesInfo) => {
  const filters = [];

  for (const [filterName, filter] of moviesFilters.entries()) {
    filters.push({
      name: filterName,
      count: filter(moviesInfo).length,
      filter: filter(moviesInfo),
    });
  }
};
