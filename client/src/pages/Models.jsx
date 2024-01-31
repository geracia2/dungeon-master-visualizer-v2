import React from 'react'
import { useState } from 'react';
import { useStateStore } from "../store";
import axios from "axios";


import SearchBar from "../components/searchBar";
import ModelPresets from "../components/models/modelPresets";
import ModelList from "../components/models/modelList";
import Typography from '@mui/material/Typography'

export default function Models() {
  

  let [input, setInput] = useState("");
  const section = "Models and Environments";
  let [modelData, setModelData] = useState(null);


  // update the text input
  function handleChange(e) {
    setInput(e.target.value);
  }

  // Search bar API request
  async function handleSearch(e) {
    e.preventDefault();
    setModelData(null);
    let count = 10;
    let cursor = 'null';
    // const url = `https://api.sketchfab.com/v3/models?q=${input}&count=${count}&cursor=${cursor}&restricted=false`;
    const url = `https://api.sketchfab.com/v3/search?q=${input}&restricted=false&count=${count}`;
    try {
      const response = await axios.get(url);
      // const results = response.data.results;
      const results = response.data.results.models;
      console.log('Result from model api request', results);
      setModelData(results);
      setInput('')
  } catch (error) {
      console.warn(error);
  }
}
  

  return (
    <>
      <Typography align="center" color="text.secondary" sx={{ p: { xs: 1, sm: 3 }, typography: { xs: 'h6', sm: 'h5' } }}>
        Search for models and add them to your scene.
      </Typography>
      <SearchBar
        section={section}
        handleSearch={handleSearch}
        input={input}
        handleChange={handleChange}
      />
      <ModelPresets setModelData={setModelData} />
      <ModelList modelData={modelData} />
    </>
  )
}
