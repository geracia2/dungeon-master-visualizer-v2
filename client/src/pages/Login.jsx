import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateStore } from "../store";
let emptyForm = {
  username: "",
  password: "",
};

function Login() {
  const baseURL= import.meta.env.VITE_BASE_URL
  const navigate = useNavigate();
  const {
    setUser,
    setToken,
    setScene,
    addTitle,
    loading,
  } = useStateStore((store) => ({
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
      sceneResponse.data.map((scene)=>{
        addTitle(scene.title);
      })
      
      setScene(sceneResponse.data[0])

      console.log('navigating to scene')
      navigate("/scene");
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <br />
        <input type="text" id="username" name="username" onChange={handleChange} value={form.username} />
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

export default Login;
