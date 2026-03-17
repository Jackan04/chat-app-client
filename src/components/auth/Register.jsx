import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../api/authService";
import { useAuth } from "../../context/useAuth";

const authService = new AuthService();

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setValidationErrors([]);
    try {
      const token = await authService.register(
        username,
        password,
        passwordConfirmation,
      );
      login(token);
    } catch (error) {
      if (error.validationErrors && error.validationErrors.length > 0) {
        setValidationErrors(error.validationErrors);
      }
    }
  }
  return (
    <section className="container">
      <h2>Register</h2>
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <small>At least 6 characters</small>
        </label>
        <label htmlFor="passwordConfirmation">
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
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
