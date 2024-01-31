import { Box, Typography } from "@mui/material";
import React from "react";
import SoundMuiCard from "../components/sounds/SoundMuiCard";
import { useStateStore } from "../store";


export default function Scene() {
  const Tracks = useStateStore((store) => store.scene.tracks);
  const Model = useStateStore((store) => store.scene.model)

  console.log("your tracks",Tracks);
  console.log("your model", Model);

  const style = {
    p: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start;",
    flexDirection: "column",
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    width: "80vw",
    // width: "500px",
    height: "60vh",
    // height: "400px",
    borderRadius: "15px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 15,
    p: 4,
  };

  return (
    <>
      <Box
        sx={{
          p: 5,
          // height: "100vh",
          display: "flex",
          justifyContent: "flex=start",
          alignItems: "center",
          flexDirection: "column",
          flexWrap: "wrap",
          // alignContent:'center',
          // alignContent:'stretch',
          // alignContent:'flex-start',
          gap: "10px",
        }}
      >
        {Tracks && (
          <>
            <Box
              sx={{
                p: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                // alignContent:'center',
                // alignContent:'stretch',
                // alignContent:'flex-start',
                gap: "5px",
              }}
            >
              {Tracks.map((track) => (
                <SoundMuiCard track={track} key={track.id} />
              ))}
            </Box>
          </>
        )}

        {Model.uid && (
          <>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {Model.name}
              </Typography>
              <iframe
                src={`https://sketchfab.com/models/${Model.uid}/embed`}
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
                // class="fop"
                frameBorder="0"
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
