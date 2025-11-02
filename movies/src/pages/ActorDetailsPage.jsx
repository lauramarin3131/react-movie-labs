import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getActorDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const { data: actor, isPending, isError, error } = useQuery({
    queryKey: ["actor", { id }],
    queryFn: getActorDetails,
  });
  
  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
 
  return (
    <div style={{ padding: "2rem" }}>
      <h2>{actor.name}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt={actor.name}
        width="250"
      />
      <p><strong>Born:</strong> {actor.birthday || "Unknown"}</p>
      <p><strong>Place of birth:</strong> {actor.place_of_birth || "Unknown"}</p>
      <p><strong>Biography:</strong> {actor.biography || "No biography available."}</p>
    </div>
  );
};

export default ActorDetailsPage;
