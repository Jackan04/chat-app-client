import ConversationService from "../api/conversationService";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import { getRecipient } from "../utils/helpers";
import ErrorMessage from "./ErrorMessage";

const conversationService = new ConversationService();

export default function ConversationList() {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");
  const { token, currentUser } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        const conversations = await conversationService.getConversations(token);

        setConversations(conversations);
      } catch (error) {
        setError(error.message);
      }
    }

    load();
  }, [token]);

  if (conversations.length === 0) {
    return <p>No conversations to display</p>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="container">
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <Link to={`/conversations/${conversation.id}`}>
              {getRecipient(conversation.participants, currentUser)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
