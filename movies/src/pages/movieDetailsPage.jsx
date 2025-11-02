import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
// import useMovie from "../hooks/useMovie";   Redundant
import { getMovieRecommendations} from '../api/tmdb-api';
import { getMovieCredits } from "../api/tmdb-api";
import MovieCredits from "../components/movieCredits";


const MoviePage = (props) => {
  const { id } = useParams();

  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })
  const { data: recommendations } = useQuery({
    queryKey: ['recommendations', { id }],
    queryFn: getMovieRecommendations,
  });
  const { data: credits } = useQuery({
  queryKey: ['credits', { id }],
  queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie} >
            <MovieDetails movie={movie}/>
              {recommendations && recommendations.length > 0 && (
              <>
                <h3>Recommended Movies</h3>
                <ul>
                  {recommendations.slice(0, 5).map((rec) => (
                    <li key={rec.id}>{rec.title}</li>
                  ))}
                </ul>
              </>
              )}
              
            <MovieCredits movieId={movie.id} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
