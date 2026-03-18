import { useState } from "react";
import { useAuth } from "../context/useAuth";
import UserService from "../api/userService";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import PageHeader from "./PageHeader";

const userService = new UserService();

export default function Profile() {
  const { currentUser, token, loadCurrentUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [online, setOnline] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!currentUser) return;

    setError("");
    setValidationErrors([]);
    setLoading(true);
    try {
      await userService.updateUser(token, currentUser.id, {
        displayName,
        bio,
        online,
      });
      await loadCurrentUser();
      setIsEditing(false);
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

  function handleEditStart() {
    if (!currentUser) return;

    setDisplayName(currentUser.displayName ?? "");
    setBio(currentUser.bio ?? "");
    setOnline(Boolean(currentUser.online));
    setIsEditing(true);
  }

  if (loading) return <LoadingMessage />;
  if (!currentUser) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="container">
      <PageHeader title="Profile" />
      <form onSubmit={handleSubmit}>
        <ul>
          {validationErrors.length > 0 &&
            validationErrors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
        </ul>
        <label data-field htmlFor="username">
          Username
          <input value={currentUser.username ?? ""} disabled></input>
        </label>
        <label data-field htmlFor="online">
          Online
          <input
            id="online"
            disabled={!isEditing}
            type="checkbox"
            checked={isEditing ? online : Boolean(currentUser.online)}
            onChange={(event) => setOnline(event.target.checked)}
          />
        </label>

        <label data-field htmlFor="displayName">
          Display Name
          <input
            value={isEditing ? displayName : (currentUser.displayName ?? "")}
            disabled={!isEditing}
            type="text"
            id="displayName"
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </label>
        <label data-field htmlFor="bio">
          Bio
          <input
            type="text"
            id="bio"
            disabled={!isEditing}
            value={isEditing ? bio : (currentUser.bio ?? "")}
            onChange={(event) => setBio(event.target.value)}
          />
        </label>

        {!isEditing && (
          <div className="vstack">
            <button type="button" onClick={handleEditStart}>
              Edit
            </button>
            <button
              type="button"
              className="outline"
              data-variant="danger"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}

        {isEditing && (
          <div className="hstack">
            <button type="submit">Save</button>
            <button
              className="outline"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
