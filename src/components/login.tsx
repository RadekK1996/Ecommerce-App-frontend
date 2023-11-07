import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserErrors } from "../errors";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (err) {
      let errorMessage: string = "";

      switch (err?.response?.data?.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "No user found";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong credentials";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      alert("Error:" + errorMessage);
    }
  };
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type=" text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export { Login };
