import React from 'react'
import { useState } from 'react';
import { useStateStore } from "../store";

export default function Sounds() {
  const {
    addTrack,
    deleteTrack,
  } = useStateStore((store) => ({
    addTrack: store.addTrack,
    deleteTrack: store.deleteTrack,
  }))
 
  // token for FreeSound
  const fsKey = import.meta.env.VITE_KEY_FS;

  const [fsListData, setFSListData] = useState(null);
  const [fsTrack, setFSTrack] = useState(null);
  const [input, setInput] = useState("");

  const section = "Music and Sounds";

  // Preset API requests -> List
  async function handlePreset(param) {
    const url = `https://freesound.org/apiv2/search/text/?query=${param}`;
    const options = {
      headers: {
        Authorization: `Token ${fsKey}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setFSListData(data.results);
    } catch (error) {
      console.warn(error);
    }
  }

  // Search bar API request -> List
  async function handleSubmit(e) {
    e.preventDefault(); // don't refresh the page with a form submission
    const url = `https://freesound.org/apiv2/search/text/?query=${input}`;
    const options = {
      headers: {
        Authorization: `Token ${fsKey}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      // dispatch here
      setFSListData(data.results);
    } catch (error) {
      console.warn(error);
    }
  }

  // Selected fsTrack API requests -> Solo fsTrack
  async function handleTrack(param) {
    const url = `https://freesound.org/apiv2/sounds/${param}/`;
    const options = {
      headers: {
        Authorization: `Token ${fsKey}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data);
      setFSTrack(data);
    } catch (error) {
      console.warn(error);
    }
  }
  return (
    <div>Sounds
      <div>
        <button onClick={()=>addTrack({testing: "value", id: 333})}>add a track</button>
        <button onClick={()=>deleteTrack(333)}>delete a track</button>
      </div>
    </div>
  )
}
