import React, {useState, useEffect}  from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    borderRadius: 1,
    "& .MuiInputBase-root": {
      backgroundColor: "#fff1f1ff", 
    },
  };

export default function FilterMoviesCard(props) {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };


  return (
    <Card 
      sx={{
        minHeight: 120,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#b0dfd7ff", 
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        flexShrink: 0
      }} 
      variant="outlined">
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1,alignItems: "center",flexWrap: "wrap" }}>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
            size="small"
            sx={{...formControl, width: 200}}
            id="filled-search"
            label="Search field"
            type="search"
            variant="outlined"
            value={props.titleFilter}
            onChange={handleTextChange}
        />
        <TextField
          size="small"
          sx={{ ...formControl, width: 200 }}
          label="Year From"
          type="number"
          variant="outlined"
          value={props.yearFrom || ""}
          onChange={(e) => handleChange(e, "yearFrom", e.target.value)}
        />
        <TextField
          size="small"
          sx={{ ...formControl, width: 200}}
          label="Year To"
          type="number"
          variant="outlined"
          value={props.yearTo || ""}
          onChange={(e) => handleChange(e, "yearTo", e.target.value)}
        />
        <TextField
          size="small"
          sx={{ ...formControl,width: 200 }}
          label="Min Rating"
          type="number"
          variant="outlined"
          value={props.minRating || ""}
          onChange={(e) => handleChange(e, "minRating", e.target.value)}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            size="small"
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            size="small"
            labelId="sort-label"
            id="sort-select"
            value={props.sortBy || ""}
            onChange={(e) => props.onUserInput("sortBy", e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="year">Year</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>        
      </CardContent>
      <CardMedia
        sx={{  width: 150, height: 80,objectFit: "cover", borderRadius: 1, ml: 2, flexShrink: 0 }}
        image={img}
        title="Filter"
      />
    </Card>
  );
}
