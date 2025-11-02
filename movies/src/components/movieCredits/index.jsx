import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { Link } from "react-router";

const MovieCredits = ({ movieId }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["credits", { id: movieId }],
    queryFn: getMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <p>{error.message}</p>;

  const cast = data.cast || [];

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Cast</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cast.slice(0, 10).map((actor) => (
          <li key={actor.id} style={{ marginBottom: "0.5rem" }}>
            <Link
              to={`/actors/${actor.id}`}
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              {actor.name} as {actor.character}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCredits;
