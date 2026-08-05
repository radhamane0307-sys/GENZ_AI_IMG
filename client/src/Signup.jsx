import { useState } from "react";
import axios from "axios";

export default function Signup({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      email,
      password,
    });

    alert(res.data.msg);
    setPage("login");
  };

  return (
  <div className="auth">
  <h2>Signup</h2>
  <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
  <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
  <button onClick={signup}>Signup</button>
  <p onClick={() => setPage("login")}>Already have account</p>
</div>
  );
}