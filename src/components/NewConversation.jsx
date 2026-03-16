import { useState } from "react";
import UserService from "../api/userService";
import { useAuth } from "../context/useAuth";

const userService = new UserService();

export default function NewConversation() {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const result = await userService.getUsersByUsername(token, searchQuery);
      console.log(result);

      setUsers(result);
    } catch (error) {
      setError(error.message);
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a user"
            id="user"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <ul>
        {users.length > 0 &&
          users.map((user) => (
            <div key={user.id}>
              <li onClick={() => setIsOpen(user.id)}>{user.username}</li>
              <UserDialog
                user={user}
                isOpen={isOpen}
                handleClose={() => setIsOpen(null)}
                handleNewConversation={""}
              />
            </div>
          ))}
      </ul>
    </>
  );
}

function UserDialog({ user, isOpen, handleClose, handleNewConversation }) {
  return (
    <dialog open={isOpen}>
      <header>
        <h2>{user.username}</h2>
      </header>
      <main>
        <p>{user.online ? "Online" : "Offline"}</p>
        <p>Bio: {user.bio}</p>
        <button onClick={handleNewConversation}>New Conversation</button>
      </main>
      <footer>
        <button onClick={handleClose}>Close</button>
      </footer>
    </dialog>
  );
}
