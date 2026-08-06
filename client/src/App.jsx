import { useState, useEffect } from "react";
import Login from "./login";
import Signup from "./Signup";
import Home from "./Home";

function App() {
  const [page, setPage] = useState("login");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuth(true);
  }, []);

  if (isAuth) return <Home />;

  return page === "login" ? (
    <Login setPage={setPage} />
  ) : (
    <Signup setPage={setPage} />
  );
}

export default App;