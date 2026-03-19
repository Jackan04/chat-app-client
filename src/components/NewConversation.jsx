import { useState } from "react";
import UserService from "../api/userService";
import ConversationService from "../api/conversationService";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import EmptyState from "./EmptyState";
import PageHeader from "./PageHeader";

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
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <section className="container">
      <PageHeader title="New Conversation" />
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
      {hasSearched && users.length === 0 ? (
        <EmptyState
          title="No users found"
          message="Try searching for a different username"
        />
      ) : (
        <>
          <div className="table mt-6">
            <p className="text-light">Result: {users.length}</p>
            <table>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} onClick={() => setIsOpen(user.id)}>
                    <td className="hstack gap-4">
                      <figure data-variant="avatar">
                        <i className="fa-solid fa-user"></i>
                      </figure>
                      {user.displayName}
                    </td>
                    <td>
                      <span
                        className={`badge ${user.online ? "success" : "danger"}`}
                      >
                        {user.online ? "Online" : "Offline"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.map((user) => (
            <UserDialog
              key={user.id}
              user={user}
              isOpen={isOpen === user.id}
              currentUser={currentUser}
              handleClose={() => setIsOpen(null)}
              handleNewConversation={handleNewConversation}
            />
          ))}
        </>
      )}
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
          <div className="hstack justify-between">
            <h2>{user.displayName}</h2>
            <span className={`badge ${user.online ? "success" : "danger"}`}>
              {user.online ? "Online" : "Offline"}
            </span>
          </div>
          <p className="text-light">Username: {user.username}</p>
        </header>
        <main>
          {user.bio && (
            <>
              <h4>About</h4>
              <p>{user.bio}</p>
            </>
          )}
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
