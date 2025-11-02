import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import { Link } from "react-router";
import Spinner from "../spinner";

const MovieRecommendations = ({ movieId }) => {
  const { data: recommendations, isLoading, isError, error } = useQuery({
    queryKey: ["recommendations", { id: movieId }],
    queryFn: () => getMovieRecommendations(movieId),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>{error.message}</p>;

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Recommended Movies</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {recommendations.slice(0, 5).map((rec) => (
          <div key={rec.id} style={{ width: "150px" }}>
            <Link to={`/movies/${rec.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                alt={rec.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p>{rec.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
