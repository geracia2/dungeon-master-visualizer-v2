import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStateStore } from "../store";

let emptyForm = {
  username: "",
  password: "",
  email: "",
};

function Register() {
  const navigate = useNavigate();
  const {
    setUser,
    setToken,
    setLoading,
    setScene,
    addTitle,
  } = useStateStore((store) => ({
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
      const response = await axios.post("http://localhost:5000/auth/register", form);
      // axios formats the response to json already for us
      // data.token should give us the token string, encrypted
      const token = response.data.token;
      const id = response.data.id;
      console.log('Token created', token);
      setToken(token)
      // if we don't have any tokens, reset the form
      if (!token) {
        setToken(null)
        setForm(emptyForm);
        return;
      }
      // if we do get a token, we want to store it to persist user authorization
      // localStorage set (key, value(make sure its a string))
      localStorage.setItem("token", token);

      console.log('Seeding scene')
      const seedScene = await axios.get(`http://localhost:5000/api/scene/${id}/seed`, {
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
      const userResponse = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: token },
      });
      console.log('Got user info in response');
      setUser(userResponse.data);
      console.log("User set");

      console.log("Getting scenes");
      const sceneResponse = await axios.get(`http://localhost:5000/api/scene/${id}`, {
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
      navigate("/models");

    } catch (err) {
      console.log(err.response.data.error);
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit}
      // what this is creating from input's names:
      // {username: 'asd', password: 'pas123', email: 'bob@gmail.com'}
      >
        <label htmlFor="username">Username:</label>
        <br />
        <input type="text" id="username" name="username" onChange={handleChange} value={form.username} />
        <br />
        {/* <label htmlFor="email">Email:</label> */}
        {/* <br /> */}
        {/* <input type="email" id="email" name="email"onChange={handleChange} value={form.email} /> */}
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input type="password" id="password" name="password" onChange={handleChange} value={form.password} />
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}

export default Register;
