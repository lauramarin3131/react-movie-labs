import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToPlaylistIcon = ({ movie }) => {
  const { addToMustWatch } = useContext(MoviesContext);

  const handleClick = (e) => {
   e.preventDefault();
    addToMustWatch(movie); 
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleClick}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};
export default AddToPlaylistIcon;
