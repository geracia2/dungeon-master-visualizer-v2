import React from "react";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

export default function SoundList({ fsListData, handleTrack }) {
  return (
    <>
      {fsListData ? ( // conditional if state is not [false, 0, '', null, undefined, NaN]
        <>
          <List
            sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper", borderRadius: '15px', }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {fsListData.map((tracks, i) => (
              <ListItemButton
                key={tracks.id}
                onClick={() => handleTrack(tracks.id)}
              >
                <ListItemText primary={tracks.name} />
              </ListItemButton>
            ))}
          </List>
        </>
      ) : (
        <>
          <Typography variant="caption" color="text.disabled" sx={{ display: "flex", justifyContent: "center" }}>
            [ The bard rolled a nat 1. Their lute is off key. ]
          </Typography>
        </>)
      }
    </>
  );
}
