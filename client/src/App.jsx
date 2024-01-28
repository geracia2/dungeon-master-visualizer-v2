import './App.css'

import TopAppBar from './components/TopAppBar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Models from './pages/Models';
import Sounds from './pages/Sounds';
import Scene from './pages/Scene';

import { Routes, Route } from "react-router-dom";
import  {useStateStore}  from './store';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  let user = useStateStore(state => state.user)
  let setUser = useStateStore(store => store.setUser)
  let clearUser = useStateStore(store => store.clearUser)
  // const [user, setUser] = useState({});
  // we need time to check if token is loaded in to state, not just localStorage
  const [loading, setLoading] = useState(true);

  // grab user from database with token as ID
  async function getUser(token) {
    try {
      console.log('starting to get user')
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: token,
        },
      });
      setUser(response.data);
      console.log('token and DB user match', response.data)
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
    }
    setLoading(false);
  }

  useEffect(() => {
    // look for token in localstorage if we are logged in.
    console.log('looking into localStorage')
    const token = localStorage.getItem("token");
    if (token) {
      // get user info, which is just token : asdfasdf right now in localstorage
      console.log('got token')
      getUser(token);
    } else {
      console.log('No token')
      setLoading(false);
    }
  }, []);

  return (
    <>
      <TopAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/models" element={<Models />} />
        <Route path="/sounds" element={<Sounds />} />
        <Route path="/scene" element={<Scene />} /> 
      </Routes>
    </>
  )
}

export default App
