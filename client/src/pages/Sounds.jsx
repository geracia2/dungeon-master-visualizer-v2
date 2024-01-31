import React from 'react'
import { useState } from 'react';
import { useStateStore } from "../store";
import SearchBar from "../components/searchBar";
import SoundList from '../components/sounds/SoundList';
import SoundPresets from '../components/sounds/SoundPresets';
import SoundTrack from '../components/sounds/SoundTrack';
import Typography from "@mui/material/Typography";
import axios from "axios";

import { Box } from "@mui/material";

export default function Sounds() {
  // token for FreeSound
  const fsKey = import.meta.env.VITE_KEY_FS;
  const section = "Music and Sounds";

  const {
    addTrack,
    deleteTrack,
  } = useStateStore((store) => ({
    addTrack: store.addTrack,
    deleteTrack: store.deleteTrack,
  }))


  const [fsListData, setFSListData] = useState(null);
  const [fsTrack, setFSTrack] = useState(null);
  const [input, setInput] = useState("");


  // Search bar API request -> List
  async function handleSearch(e) {
    e.preventDefault(); // don't refresh the page with a form submission
    let count = 10;
    let cursor = 'null';
    const url = `https://freesound.org/apiv2/search/text/?query=${input}`;
    const options = { headers: { Authorization: `Token ${fsKey}` } }
    try {
      const response = await axios.get(url, options);
      const results = response.data.results;
      console.log('Results from sound search', results);
      setFSListData(results);
    } catch (error) {
      console.warn(error);
    }
  }

  // Selected fsTrack API requests -> Solo fsTrack
  async function handleTrack(param) {
    // FreeSound does not like axios?!? cors issue with the exact same request
    // let count = 10;
    // let cursor = 'null';
    // const url = `https://freesound.org/apiv2/sounds/${param}`;
    // const options = { headers: { Authorization: `Token ${fsKey}` } }
    // try {
    //   const response = await axios.get(url, options);
    //   console.log(response)
    //   const results = response.data.results;
    //   console.log('Soloed Track', results);
    //   setFSTrack(results);
    // } catch (error) {
    //   console.warn(error);1
    // }
    const url = `https://freesound.org/apiv2/sounds/${param}/`;
    const options = {
      headers: {
        Authorization: `Token ${fsKey}`,
      },
    };
    try {
      const response = await fetch(url, options);
      console.log(response)
      const data = await response.json();
      // console.log(data);
      setFSTrack(data);
    } catch (error) {
      console.warn(error);
    }
  }

  // update the text input
  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <>
      <Typography align="center" color="text.secondary" sx={{ p: { xs: 1, sm: 3 }, typography: { xs: 'h6', sm: 'h5' } }}>
        Search for music or sounds and add them to your scene.
      </Typography>
      <SearchBar
        section={section}
        handleSearch={handleSearch}
        input={input}
        handleChange={handleChange}
      />
      <SoundPresets setFSListData={setFSListData} />
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <SoundList fsListData={fsListData} handleTrack={handleTrack} />
        <SoundTrack fsTrack={fsTrack} />
      </Box>
    </>
  )
}
