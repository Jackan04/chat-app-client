import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ConversationService from "../api/conversationService";
import { useAuth } from "../context/useAuth";
import { getRecipient } from "../utils/helpers";

const conversationService = new ConversationService();

export default function Conversation() {
  const [recipient, setRecipient] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [recivedMessages, setRecivedMessages] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { token, currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    async function load() {
      try {
        const conversation = await conversationService.getConversationById(
          token,
          id,
        );
        console.log(conversation);
        setSentMessages(
          conversation.messages.filter(
            (message) => message.senderId === currentUser.id,
          ),
        );
        setRecivedMessages(
          conversation.messages.filter(
            (message) => message.senderId !== currentUser.id,
          ),
        );
        setRecipient(getRecipient(conversation.participants, currentUser));
      } catch (error) {
        setError(error.message);
      }
    }

    load();
  }, [currentUser, id, token]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h2>Conversation with {recipient}</h2>
      <div>
        <p>Recived messages</p>
        <ul>
          {recivedMessages.map((message) => (
            <li key={message.id}>
              {recipient} says {message.content}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>Sent messages</p>
        <ul>
          {sentMessages.map((message) => (
            <li key={message.id}>You said {message.content}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
