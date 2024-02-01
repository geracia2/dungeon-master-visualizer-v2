import { useStateStore } from "../store";
import React from "react";
import SoundMuiCard from "../components/sounds/SoundMuiCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

import {
  Alert,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

export default function Scene() {
  const tracks = useStateStore((store) => store.scene?.tracks);
  const model = useStateStore((store) => store.scene?.model)
  const removeModel = useStateStore((store)=> store.removeModel)

  console.log("your tracks", tracks)
  console.log("your model", model)

  return (
    <>
      <Box
        sx={{
          // py: 3,
          display: "flex",
          justifyContent: "flex=start",
          alignItems: "center",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "10px",
          // border: "2px solid #000",

        }}
      >

        {Array.isArray(tracks) && tracks.length > 0 ? (<>
          {console.log("your tracks", tracks)
          }
          <Box
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {tracks.map((track) => (
              <SoundMuiCard track={track} key={track.id} />
            ))}
          </Box>
        </>) : (<>
          <Alert variant="outlined" severity="info">
            Add some tunes!
          </Alert>
        </>)}

        {model.hasOwnProperty('username') ? (<>
          {console.log("your model", model)}
          <Box sx={{
            px: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start;",
            flexDirection: "column",
            width: "98vw",
            height: "80vh",
            borderRadius: "12px",
            bgcolor: "background.paper",
            boxShadow: 15,
          }}>
            <Box sx={{
              display: 'flex', justifyContent: 'space-between', flexDirection: "row", alignItems: "center",
              width: '100%'

            }} >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {model.name}
              </Typography>
              <IconButton onClick={removeModel}>
              <DeleteIcon />
              </IconButton>
            </Box>
            <iframe
              src={`https://sketchfab.com/models/${model.uid}/embed`}
              id="api-frame"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking="true"
              execution-while-out-of-viewport="true"
              execution-while-not-rendered="true"
              web-share="true"
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              accelerometer="true"
              // resize stuff:
              width="100%"
              height="90%"
              frameBorder="0"
            />
          </Box>
        </>) : (<>
          <Alert variant="outlined" severity="info">
            Add a model!
          </Alert>
        </>)}

      </Box>
    </>
  );
}
