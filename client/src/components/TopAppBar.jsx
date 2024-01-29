import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateStore } from './../store';

export default function TopAppBar() {
  const navigate = useNavigate();
  const {
    user, 
    clearUser,
    clearTitles,
    clearScene
  } = useStateStore((store) => ({
    user: store.user,
    setUser: store.clearUser,
    loading: store.clearTitles,
    setLoading: store.clearScene
  }))

  function logout() {
    // remove token from local storage and state
    clearUser();
    clearTitles()
    clearScene()
    localStorage.removeItem('token')
    localStorage.removeItem('dmv')
    navigate('/login')
  };

  return (
    <div>TopAppBar
      <br />
      {user.username ? (
        <>
          Welcome {user.username}
          <br />
          <button type="button" onClick={logout}>logout</button>
        </>
      ) : (
        <>
          no one is logged in
        </>
      )}
    </div>
  )
}
