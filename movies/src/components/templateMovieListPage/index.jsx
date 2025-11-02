import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) =>{
      const year = m.release_date?.slice(0, 4);
      if (yearFrom && year < yearFrom) return false;
      if (yearTo && year > yearTo) return false;
      return true;
    })
    .filter((m) =>{
       return minRating ? m.vote_average >= Number(minRating) : true;
    })
    .sort((a, b) => {
    if (sortBy === "year") {
      return (b.release_date || "").localeCompare(a.release_date || "");
    } else if (sortBy === "rating") {
      return b.vote_average - a.vote_average;
    }
    return 0;
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "yearFrom") setYearFrom(value);
    else if (type === "yearTo") setYearTo(value);
    else if (type === "minRating") setMinRating(value);
    else if (type === "sortBy") setSortBy(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            yearFrom={yearFrom}
            yearTo={yearTo}
            minRating={minRating}
            sortBy={sortBy}
          />
        </Grid>
          <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
