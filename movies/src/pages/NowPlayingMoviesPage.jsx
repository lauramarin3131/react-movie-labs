import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getNowPlayingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const NowPlayingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: getNowPlayingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data; 
  return (
    <PageTemplate
      title="Now Playing Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default NowPlayingMoviesPage;
