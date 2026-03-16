import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../api/authService";
import { useAuth } from "../../context/useAuth";

const authService = new AuthService();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setValidationErrors([]);
    try {
      const token = await authService.login(username, password);
      login(token);
    } catch (error) {
      if (error.validationErrors && error.validationErrors.length > 0) {
        setValidationErrors(error.validationErrors);
      }
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {validationErrors.length > 0 &&
            validationErrors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
        </ul>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
