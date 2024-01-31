import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import StopIcon from "@mui/icons-material/Stop";
import DeleteIcon from "@mui/icons-material/Delete";
// reducers
import { Remove_Track, Add_Track } from "../utility/store/freesSoundSlice";
import { useDispatch } from 'react-redux';

export default function SoundMuiCard({ track }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start;",
          flexDirection: "column",
          flexWrap: "wrap",
          bgcolor: "secondary.dark",
          borderRadius: "15px",
        }}
      >
        {/* title and delete */}
        <Box
          sx={{
            // maxWidth: "300px",
            // minWidth: "150px",
            width: { sm: "260px", md: "305px" },
            // mt: 3,
            // mx: 15,
            p: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // justifyContent: "flex-start",
            // justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography component="div" variant="caption">
            {track.name}
          </Typography>
          <IconButton onClick={()=>dispatch(Remove_Track(track.id))}>
            <DeleteIcon />
          </IconButton>
        </Box>
        {/* audio cotrols */}
        <Box sx={{ display: "flex", alignSelf: "center", px: 1, py: 1 }}>
          <audio
            controls
            loop
            style={{ height: "30px" }}
            src={track["previews"]["preview-hq-mp3"]}
          />
        </Box>
      </Box>
    </>
  );
}
