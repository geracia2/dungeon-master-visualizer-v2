import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateStore } from "../store";
let emptyForm = {
  username: "",
  password: "",
  email: "",
};

function Login() {
  const navigate = useNavigate();
  const loading = useStateStore((store) => store.loading)
  const setUser = useStateStore(store => store.setUser)

  let [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", form);
      const token = response.data.token;
      console.log(token);
      if (!token) {
        setForm(emptyForm);
        return;
      }
      localStorage.setItem("token", token);
      const userResponse = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: token },
      });
      console.log(userResponse.data)
      setUser(userResponse.data);
      navigate("/models");
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
