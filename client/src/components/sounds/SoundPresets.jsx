import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import axios from "axios";

export default function SoundPresets({ setFSListData }) {
  // token for FreeSound
  const fsKey = import.meta.env.VITE_KEY_FS;
  // Preset API  requests -> List
  async function handlePreset(param) {
    let count = 10;
    let cursor = 'null';
    const url = `https://freesound.org/apiv2/search/text/?query=${param}`;
    const options = { headers: { Authorization: `Token ${fsKey}` } }
    try {
      const response = await axios.get(url, options);
      const results = response.data.results;
      console.log('Results from sound preset', results);
      setFSListData(results);
    } catch (error) {
      console.warn(error);
    }
  }
  return (
    <>
    <Box sx={{ p: 5, display: 'flex', justifyContent: 'center', }}>
      <ButtonGroup color="secondary" size="small" aria-label="">
        <Button onClick={() => handlePreset("Dungeon+atmosphere+rpg")}>Dungeon</Button>
        <Button onClick={() => handlePreset("game+battle+loop")}>Battle</Button>
        <Button onClick={() => handlePreset("fantasy+background+music+rpg+loop")}>Atmosphere</Button>
        <Button onClick={() => handlePreset("village+music+rpg")}>Village</Button>
      </ButtonGroup>
      </Box>
    </>
  );
}
