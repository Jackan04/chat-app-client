import { useState } from "react";
import { useAuth } from "../context/useAuth";
import UserService from "../api/userService";
import ErrorMessage from "./ErrorMessage";

const userService = new UserService();

export default function Profile() {
  const { currentUser, token, loadCurrentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [online, setOnline] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!currentUser) return;

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
    }
  }

  function handleEditStart() {
    if (!currentUser) return;

    setDisplayName(currentUser.displayName ?? "");
    setBio(currentUser.bio ?? "");
    setOnline(Boolean(currentUser.online));
    setIsEditing(true);
  }

  if (!currentUser) return <p>Loading...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input value={currentUser.username ?? ""} disabled></input>
        </label>
        <label htmlFor="online">
          Online
          <input
            id="online"
            disabled={!isEditing}
            type="checkbox"
            checked={isEditing ? online : Boolean(currentUser.online)}
            onChange={(event) => setOnline(event.target.checked)}
          />
        </label>

        <label htmlFor="displayName">
          Display Name
          <input
            value={isEditing ? displayName : (currentUser.displayName ?? "")}
            disabled={!isEditing}
            type="text"
            id="displayName"
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </label>
        <label htmlFor="bio">
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
          <button type="button" onClick={handleEditStart}>
            Edit
          </button>
        )}

        {isEditing && (
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
