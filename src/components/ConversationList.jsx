import ConversationService from "../api/conversationService";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import { getRecipient } from "../utils/helpers";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import EmptyState from "./EmptyState";
import { useNavigate } from "react-router-dom";

const conversationService = new ConversationService();

export default function ConversationList() {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const conversationList =
          await conversationService.getConversations(token);

        setConversations(conversationList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  if (loading) return <LoadingMessage />;
  if (error)
    return <ErrorMessage message={error} onRetry={() => setError("")} />;

  return (
    <section className="container">
      <h2>Conversations</h2>
      {conversations.length === 0 ? (
        <EmptyState
          title="No conversations yet"
          message="Start a new conversation to see it listed here."
        />
      ) : (
        <div className="table">
          <table>
            <tbody>
              {conversations.map((conversation) => {
                const recipient = getRecipient(
                  conversation.participants,
                  currentUser,
                );

                return (
                  <tr
                    onClick={() =>
                      navigate(`/conversations/${conversation.id}`)
                    }
                    key={conversation.id}
                  >
                    <td className="hstack gap-4">
                      <figure data-variant="avatar">
                        <i className="fa-solid fa-user"></i>
                      </figure>
                      {recipient.displayName}
                    </td>
                    <td>
                      <span
                        className={`badge ${recipient.online ? "success" : "danger"}`}
                      >
                        {recipient.online ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td>
                      {new Date(conversation.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
