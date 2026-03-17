import { useState } from "react";
import UserService from "../api/userService";
import ConversationService from "../api/conversationService";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const userService = new UserService();
const conversationService = new ConversationService();

export default function NewConversation() {
  const { token, currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!searchQuery) return;
    setHasSearched(true);
    try {
      const result = await userService.getUsersByUsername(token, searchQuery);
      console.log(result);
      setUsers(result);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleNewConversation(recipient) {
    if (!currentUser) return;

    try {
      const participants = [currentUser, recipient];
      const result = await conversationService.createConversation(
        token,
        participants,
      );
      navigate(`/conversations/${result.id}`);
    } catch (error) {
      setError(error.message);
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="container">
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
        {hasSearched && users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <div key={user.id}>
              <li onClick={() => setIsOpen(user.id)}>{user.displayName}</li>
              <UserDialog
                user={user}
                isOpen={isOpen === user.id}
                currentUser={currentUser}
                handleClose={() => setIsOpen(null)}
                handleNewConversation={handleNewConversation}
              />
            </div>
          ))
        )}
      </ul>
    </section>
  );
}

function UserDialog({
  user,
  isOpen,
  currentUser,
  handleClose,
  handleNewConversation,
}) {
  return (
    <dialog open={isOpen}>
      <header>
        <h2>{user.displayName}</h2>
      </header>
      <main>
        <p>{user.online ? "Online" : "Offline"}</p>
        <p>Bio: {user.bio}</p>
        <button
          disabled={user.id === currentUser.id}
          onClick={() => handleNewConversation(user)}
        >
          New Conversation
        </button>
      </main>
      <footer>
        <button onClick={handleClose}>Close</button>
      </footer>
    </dialog>
  );
}
