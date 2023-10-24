import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { UserErrors } from "../errors";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/user/register", {
        username,
        password,
      });
      alert("Registration completed. Now Login.");
    } catch (err) {
      if (err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXIST) {
        alert("Error: Username already exists");
      } else {
        alert("Error: Something went wrong");
      }
    }
  };
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export { Register };
