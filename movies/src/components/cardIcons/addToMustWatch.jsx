import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import IconButton from "@mui/material/IconButton";

const AddToMustWatchIcon = ({ movie }) => {
  const { addToMustWatch } = useContext(MoviesContext);

  return (
    <IconButton
      color="primary"
      onClick={() => addToMustWatch(movie)}
      title="Add to Must Watch"
    >
      <PlaylistAddIcon />
    </IconButton>
  );
};

export default AddToMustWatchIcon;
