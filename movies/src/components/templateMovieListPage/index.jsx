import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1); 
   const moviesPerPage = 8; 
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
  const pageCount = Math.ceil(displayedMovies.length / moviesPerPage);
  const moviesToShow = displayedMovies.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );
  const handleChange = (type, value) => {
    setPage(1);
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "yearFrom") setYearFrom(value);
    else if (type === "yearTo") setYearTo(value);
    else if (type === "minRating") setMinRating(value);
    else if (type === "sortBy") setSortBy(value);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>

      <Grid >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box sx={{display: "flex", justifyContent: "center",minWidth: 400, mb: 2, maxWidth: 1200 }}>
            <FilterCard
              onUserInput={handleChange}
              titleFilter={nameFilter}
              genreFilter={genreFilter}
              yearFrom={yearFrom}
              yearTo={yearTo}
              minRating={minRating}
              sortBy={sortBy}
            />
          </Box>
        </Box>  
      
        <Grid container>
          <MovieList action={action} movies={moviesToShow}></MovieList>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
