import './App.css'

import TopAppBar from './components/TopAppBar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Models from './pages/Models';
import Sounds from './pages/Sounds';
import Scene from './pages/Scene';

import loadLocalUser from './services/loadLocalUser';

import { Navigate, Route, Routes } from "react-router-dom";
import { useStateStore } from './store';

function App() {
  // use the user name as a check for active login
  let loggedIn = useStateStore((store) => store.user.username)

  // load our localStorage token and check if it's valid
  let loading = loadLocalUser();
  console.log('loading', loading)

  return (
    <>
      <TopAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {loggedIn ? (
          <>
            {/* if logged in */}
            <Route path="/models" element={<Models />} />
            <Route path="/sounds" element={<Sounds />} />
            <Route path="/scene" element={<Scene />} />
            {/* re-route if user tries to access login/register url while not logged out */}
            {!loading && <Route path="/login" element={<Navigate to="/scene" />} />}
            {!loading && <Route path="/register" element={<Navigate to="/scene" />} />}
          </>
        ) : (
          <>
            {/* if not logged in */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {!loading && (<Route path="/models" element={<Navigate to="/login" />} />)}
            {!loading && (<Route path="/sounds" element={<Navigate to="/login" />} />)}
            {!loading && (<Route path="/scene" element={<Navigate to="/login" />} />)}
          </>
        )}
      </Routes>
    </>
  )
}

export default App
