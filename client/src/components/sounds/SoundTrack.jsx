import React from "react";
import Typography from "@mui/material/Typography";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
// mui
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { Box } from "@mui/material";
import { useStateStore } from "../../store";

export default function SoundTrack({ fsTrack }) {
  const addTrack = useStateStore((store) => store.addTrack)
  const deleteTrack = useStateStore((store) => store.deleteTrack)

  return (
    <>
      {/* {console.log(soundTrack)} */}
      {fsTrack && (
        <Box
          sx={{
            width: "260px",
            p: 4,
            bgcolor: "secondary.dark",
            borderRadius: "15px",
          }}
          spacing={4}
        >
          {console.log(fsTrack)}
          <Typography variant="body1">
            {fsTrack.name}
            <a
              href={`https://freesound.org/people/${fsTrack.username}/sounds/${fsTrack.id}/`}
            >
              <OpenInNewRoundedIcon
                aria-label="Link to FreeSond"
                color="secondary"
              />
            </a>
          </Typography>
          <Typography gutterBottom variant="body2">
            {fsTrack.description}
          </Typography>
          <img style={{ maxWidth: '240px' }} src={fsTrack.images.waveform_bw_l} alt="Waveform" />
          <Stack direction="column" spacing={2}>
            <Chip label="Add to Scene"
              onClick={() => addTrack({
                name: fsTrack.name,
                id: fsTrack.id,
                waveform: fsTrack.images.waveform_bw_l,
                preview: fsTrack.previews["preview-lq-mp3"],
              })}
              icon={<AddIcon />} />
            <Chip
              label="Remove From Scene"
              onClick={()=>deleteTrack(fsTrack.id)}
              icon={<DeleteIcon />}
              variant="outlined"
            />
          </Stack>
          <audio
            controls
            loop
            style={{ height: "30px", width: "240px", marginTop: '6px' }}
            src={fsTrack["previews"]["preview-hq-mp3"]}
          ></audio>
        </Box>
      )}
    </>
  );
}
