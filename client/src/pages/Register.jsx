import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStateStore } from "../store";
import { Box, TextField, Typography, Button } from '@mui/material/'

let emptyForm = {
  username: "",
  password: "",
};

function Register() {
  const baseURL = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate();
  const {
    setLoggedIn,
    setToken,
    setLoading,
    setScene,
    addTitle,
  } = useStateStore((store) => ({
    setLoggedIn: store.setLoggedIn,
    setUser: store.setUser,
    setToken: store.setToken,
    setLoading: store.setLoading,
    setScene: store.setScene,
    addTitle: store.addTitle
  }))

  let [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // this is where we start getting data back from server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Creating user from form', form); // {username: 'Bob', password: 'pas123', email: 'bob@gmail.com'}
      const response = await axios.post(`${baseURL}/auth/register`, form);
      // axios formats the response to json already for us
      // data.token should give us the token string, encrypted
      const token = response.data.token;
      const id = response.data.id;
      console.log('Token created', token);
      setToken(token)
      // if we don't have any tokens, reset the form
      if (!token) {
        setLoggedIn(false)
        setToken(null)
        setForm(emptyForm);
        return;
      }
      // if we do get a token, we want to store it to persist user authorization
      // localStorage set (key, value(make sure its a string))
      localStorage.setItem("token", token);

      console.log('Seeding scene')
      const seedScene = await axios.get(`${baseURL}/api/scene/${id}/seed`, {
        headers: { Authorization: token },
      });
      console.log('seeding successful')
      // // get scenes
      // seedScene.data.scene.map((scene)=>{
      //   addTitle(scene.title);
      // })
      // setScene(seedScene.data.scene[0])

      // our user/:id is going to be replaced with the header: authorization token
      // the routes authorization middleware is waiting for a header: token
      console.log('Requesting user information')
      const userResponse = await axios.get(`${baseURL}/api/users`, {
        headers: { Authorization: token },
      });
      console.log('Got user info in response');
      setUser(userResponse.data);
      console.log("User set");

      console.log("Getting scenes");
      const sceneResponse = await axios.get(`${baseURL}/api/scene/${id}`, {
        headers: { Authorization: token },
      });
      console.log("Adding titles");
      sceneResponse.data.map((scene) => {
        addTitle(scene.title);
      })
      console.log("Setting Scene");
      setScene(sceneResponse.data[0])

      console.log("end of register");
      setLoading(false);
      setLoggedIn(true);
      navigate("/models");

    } catch (err) {
      console.log(err.response.data.error);
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
        <Typography variant="h3" color="textPrimary">Register</Typography>
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

export default Register;
