import { useState } from "react";
import axios from "axios";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("https://genz-ai-img.onrender.com/api/auth/login", {
      email,
      password,
    });

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } else {
      alert(res.data.msg);
    }
  };

  return (
  <div className="auth">
  <h2>Login</h2>
  <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
  <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
  <button onClick={login}>Login</button>
  <p onClick={() => setPage("signup")}>Create account</p>
</div>
  );
}