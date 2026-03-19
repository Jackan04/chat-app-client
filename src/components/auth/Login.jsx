import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../api/authService";
import { useAuth } from "../../context/useAuth";
import LoadingMessage from "../LoadingMessage";
import ErrorMessage from "../ErrorMessage";
import ValidationErrorsMessage from "../validationErrorsMessage";

const authService = new AuthService();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setValidationErrors([]);
    setLoading(true);
    try {
      const authToken = await authService.login(username, password);
      await login(authToken);
    } catch (error) {
      setError(error.message);
      if (error.validationErrors && error.validationErrors.length > 0) {
        setError("");
        setValidationErrors(error.validationErrors);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingMessage />;
  if (error) {
    return <ErrorMessage message={error} onRetry={() => setError("")} />;
  }

  return (
    <section className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {validationErrors.length > 0 && (
          <ValidationErrorsMessage validationErrors={validationErrors} />
        )}

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
      <br />
      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}
