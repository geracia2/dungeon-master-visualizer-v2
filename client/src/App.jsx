import './App.css'

import { Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {

  return (
    <>
      <TopAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* 
        <Route path="/fabLib" element={<FabLib />} />
        <Route path="/soundLib" element={<SoundLib />} />
        <Route path="/scene" element={<Scene />} /> 
        */}
      </Routes>
    </>
  )
}

export default App
