import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import PageTemplate from "../components/templateMovieListPage";

const MustWatchPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const mustWatchQueries = useQueries({
    queries: movieIds.map((id) => ({
      queryKey: ['movie', { id }],
      queryFn: getMovie,
    })),
  });

  const isPending = mustWatchQueries.find(q => q.isPending);
  if (isPending) return <Spinner />;

  const movies = mustWatchQueries.map(q => q.data);

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={() => null} // aquí puedes agregar botones si quieres
    />
  );
};

export default MustWatchPage;
