import ConversationService from "../api/conversationService";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

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
        setError(error);
      }
    }

    load();
  }, [token]);

  function getRecipient(participants) {
    const recipient = participants.find(
      (participant) => participant.id !== currentUser.id,
    );

    return recipient.username;
  }

  if (conversations.length === 0) {
    return <p>No conversations to display</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {conversations.map((conversation) => (
        <li key={conversation.id}>
          <Link to={`/conversations/${conversation.id}`}>
            {getRecipient(conversation.participants)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
