import { useState } from "react";
import UserService from "../api/userService";
import ConversationService from "../api/conversationService";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import EmptyState from "./EmptyState";

const userService = new UserService();
const conversationService = new ConversationService();

export default function NewConversation() {
  const { token, currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!searchQuery) return;
    setHasSearched(true);
    setLoading(true);
    try {
      const result = await userService.getUsersByUsername(token, searchQuery);
      console.log(result);
      setUsers(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleNewConversation(recipient) {
    if (!currentUser) return;

    setLoading(true);
    try {
      const participants = [currentUser, recipient];
      const result = await conversationService.createConversation(
        token,
        participants,
      );
      navigate(`/conversations/${result.id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
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
          <EmptyState
            title="No users found"
            message="Try searching for a different username"
          />
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
      <div>
        <header>
          <h2>{user.displayName}</h2>
          <p>Username: {user.username}</p>
          <label>
            {user.online ? "Online" : "Offline"}
          </label>
        </header>
        <main>
          <p>Bio: {user.bio}</p>
        </main>
        <footer>
          <button
            disabled={user.id === currentUser.id}
            onClick={() => handleNewConversation(user)}
          >
            New Conversation
          </button>
          <button onClick={handleClose}>
            Close
          </button>
        </footer>
      </div>
    </dialog>
  );
}
