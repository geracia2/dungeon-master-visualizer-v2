import React from 'react'
import { useState } from 'react';
import { useStateStore } from "../store";

export default function Models() {
  const setModel = useStateStore((store) => store.setModel)
  const removeModel = useStateStore((store) => store.removeModel)
  // token for SketchFab, but may not need it
  const sfKey = import.meta.env.VITE_KEY_SF;

  let [input, setInput] = useState("");
  let [sfData, setSFData] = useState(null); // ZUS ME

  const section = "Models and Environments";

  // update the text input
  function handleChange(e) {
    setInput(e.target.value);
  }

  // Preset API requests
  async function handlePreset(param) {
    const url = `https://api.sketchfab.com/v3/search?q=${param}`;
    const options = {
      method: "GET", // GET, POST, PUT, DELETE
      headers: {
        // dependant on api
        Authorization: "Token YOUR_API_KEY",
      },
    };
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      // SF data is deeply nested {results:{models:[...]}}
      setSFData(data.results);
    } catch (error) {
      console.warn(error);
    }
  }

  // Search bar API request
  async function handleSubmit(e) {
    e.preventDefault(); // don't refresh the page with a form submission
    const url = `https://api.sketchfab.com/v3/search?q=${input}&restricted=false`;
    const options = {
      method: "GET", // GET, POST, PUT, DELETE
      headers: {
        // dependant on api
        Authorization: "Token YOUR_API_KEY",
      },
    };
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      // SF data is deeply nested {results:{models:[...]}}
      setSFData(data.results);
    } catch (error) {
      console.warn(error);
    }
  }
  return (
    <div>
      Models
      <button onClick={()=>setModel({testing: "value", id: 333})}>set model</button>
        <button onClick={removeModel}>remove model</button>
    </div>
  )
}
