import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateStore } from './../store';

export default function TopAppBar() {
  const navigate = useNavigate();
  const user = useStateStore((store) => store.user)
  const setUser = useStateStore((store) => store.setUser)



  function logout() {
    // remove token from local storage and state
    setUser(null);
    localStorage.removeItem('token')
    navigate('/login')
  };

  return (
    <div>TopAppBar
      <br />
      {user &&
        <>
          user: {user.username}
          <br />
          <button type="button" onClick={logout}>logout</button>
        </>
      }
    </div>
  )
}
