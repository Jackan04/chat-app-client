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
    <section className="container">
      <header>
        <form onSubmit={handleSubmit}>
          <label data-field htmlFor="user">
            <input
              type="text"
              placeholder="Search for a user"
              id="user"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          <button type="submit">Search</button>
        </form>
      </header>
      <ul className="unstyled vstack">
        {hasSearched && users.length === 0 ? (
          <EmptyState
            title="No users found"
            message="Try searching for a different username"
          />
        ) : (
          users.map((user) => (
            <div className="mt-6" key={user.id}>
              <li className="hstack gap-4" onClick={() => setIsOpen(user.id)}>
                <figure data-variant="avatar">
                  <i className="fa-solid fa-user"></i>
                </figure>
                {user.displayName}
              </li>
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
      <div className="vstack">
        <header className="vstack">
          <h2>{user.displayName}</h2>
          <p>Username: {user.username}</p>
          <label>{user.online ? "Online" : "Offline"}</label>
        </header>
        <main>
          <p>Bio: {user.bio}</p>
        </main>
        <footer className="hstack justify-between">
          <button
            disabled={user.id === currentUser.id}
            onClick={() => handleNewConversation(user)}
          >
            New Conversation
          </button>
          <button className="outline" onClick={handleClose}>
            Close
          </button>
        </footer>
      </div>
    </dialog>
  );
}
