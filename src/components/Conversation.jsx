import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ConversationService from "../api/conversationService";
import { useAuth } from "../context/useAuth";
import { getRecipient } from "../utils/helpers";

const conversationService = new ConversationService();

export default function Conversation() {
  const [recipient, setRecipient] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
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
        setMessages(conversation.messages);
        setRecipient(getRecipient(conversation.participants, currentUser));
      } catch (error) {
        setError(error.message);
      }
    }

    load();
  }, [currentUser, id, token]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!message) return;
    try {
      const newMessage = await conversationService.sendMessage(
        token,
        id,
        message,
      );
      console.log(newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      setError(error.message);
    }
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h2>Conversation with {recipient}</h2>
      <div>
        <ul>
          {messages.map((message) => (
            <div key={message.id}>
              <small>
                {message.senderId === currentUser.id ? "You" : recipient}
              </small>
              <p>{message.content}</p>
              <br />
            </div>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a message"
            id="message"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}
