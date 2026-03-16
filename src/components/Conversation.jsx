import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ConversationService from "../api/conversationService";
import { useAuth } from "../context/useAuth";

const conversationService = new ConversationService();

export default function Conversation() {
  const [conversation, setConversation] = useState("");
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        const conversation = await conversationService.getConversationById(
          token,
          id,
        );
        console.log(conversation);

        setConversation(conversation);
        setParticipants(conversation.participants);
        setMessages(conversation.messages);
      } catch (error) {
        setError(error);
      }
    }

    load();
  }, [id, token]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h2>Conversation</h2>
      <div>
        <p>Participants</p>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Messages</p>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              Sender ID: {message.senderId} || Message: {message.content}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
