import ConversationService from "../api/conversationService";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";

const conversationService = new ConversationService();

export default function ConversationList() {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();

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

  if (conversations.length === 0) {
    return <p>No conversations to display</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {conversations.map((conversation) => (
        <li>Conversation ID: {conversation.id}</li>
      ))}
    </ul>
  );
}
