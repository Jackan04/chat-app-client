import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../api/authService";
import { useAuth } from "../../context/useAuth";
import LoadingMessage from "../LoadingMessage";

const authService = new AuthService();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setValidationErrors([]);
    setLoading(true);
    try {
      const token = await authService.login(username, password);
      await login(token);
    } catch (error) {
      if (error.validationErrors && error.validationErrors.length > 0) {
        setValidationErrors(error.validationErrors);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingMessage />;

  return (
    <section className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {validationErrors.length > 0 &&
            validationErrors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
        </ul>
        <label data-field htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label data-field htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}
