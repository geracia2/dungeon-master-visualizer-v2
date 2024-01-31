import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateStore } from "../../store";
// reducers

export default function SoundMuiCard({ track }) {
  const deleteTrack = useStateStore((store) => store.deleteTrack)
  const removeModel = useStateStore((store) => store.removeModel)

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start;",
        flexDirection: "column",
        flexWrap: "wrap",
        bgcolor: "secondary.dark",
        borderRadius: "15px",
      }} >
        <Box sx={{
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
        }} >
          <Typography component="div" variant="caption">
            {track.name}
          </Typography>
          <IconButton onClick={() => deleteTrack(track.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
        {/* audio cotrols */}
        <Box sx={{ display: "flex", alignSelf: "center", px: 1, py: 1 }}>
          <audio
            controls
            loop
            style={{ height: "30px" }}
            src={track.preview}
          />
        </Box>
      </Box>
    </>
  );
}
