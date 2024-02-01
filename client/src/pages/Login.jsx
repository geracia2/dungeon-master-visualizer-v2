import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateStore } from "../store";

import { Box, TextField, Typography, Button } from '@mui/material/'
 
let emptyForm = {
  username: "",
  password: "",
};
function Login() {
  const baseURL = import.meta.env.VITE_BASE_URL
  console.log(`${baseURL}/auth/login`)
  const navigate = useNavigate();
  const {
    setLoggedIn,
    setUser,
    setToken,
    setScene,
    addTitle,
    loading,
  } = useStateStore((store) => ({
    setLoggedIn: store.setLoggedIn,
    setUser: store.setUser,
    setToken: store.setToken,
    setScene: store.setScene,
    addTitle: store.addTitle,
    loading: store.loading
  }))

  let [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // detailed explanation is in register as they share a similar process
    try {

      const response = await axios.post(`${baseURL}/auth/login`, form);
      const token = response.data.token;
      console.log('token', token);
      setToken(token)
      if (!token) {
        setLoggedIn(false)
        setToken(null)
        setForm(emptyForm);
        return;
      }
      localStorage.setItem("token", token);
      const userResponse = await axios.get(`${baseURL}/api/users`, {
        headers: { Authorization: token },
      });
      console.log('user response', userResponse.data)
      setUser(userResponse.data);
      // get scenes
      const sceneResponse = await axios.get(`${baseURL}/api/scene/${userResponse.data.id}`, {
        headers: { Authorization: token },
      });
      console.log('setting scene with response data', userResponse.data.id)
      sceneResponse.data.map((scene) => {
        addTitle(scene.title);
      })

      setScene(sceneResponse.data[0])
      setLoggedIn(true)
      console.log('navigating to scene')
      navigate("/scene");
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="h3" color="textPrimary">Login</Typography>
        <form onSubmit={handleSubmit} >
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            autoComplete="on"
          >
            <TextField
              label="User Name"
              id="username"
              name="username"
              type="text"
              onChange={handleChange}
              value={form.username}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Password"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button type='submit' variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default Login;
