import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../api/authService";
import { useAuth } from "../../context/useAuth";
import LoadingMessage from "../LoadingMessage";
import ErrorMessage from "../ErrorMessage";
import ValidationErrorsMessage from "../validationErrorsMessage";

const authService = new AuthService();

export default function Register() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setValidationErrors([]);
    setLoading(true);
    try {
      const token = await authService.register(
        username,
        displayName,
        password,
        passwordConfirmation,
      );
      await login(token);
    } catch (error) {
      setError(error);
      if (error.validationErrors && error.validationErrors.length > 0) {
        setError("");
        setValidationErrors(error.validationErrors);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage />;

  return (
    <section className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {validationErrors.length > 0 && (
          <ValidationErrorsMessage validationErrors={validationErrors} />
        )}

        <label data-field htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            placeholder="Choose a username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label data-field htmlFor="displayName">
          Display Name
          <input
            type="text"
            id="displayName"
            placeholder="Choose a display name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
          <small>This is the name other users will see across the app</small>
        </label>
        <label data-field htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <small>Must be at least 6 characters</small>
        </label>
        <label data-field htmlFor="passwordConfirmation">
          Confirm Password
          <input
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <br />
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
