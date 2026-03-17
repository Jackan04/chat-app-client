import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ConversationService from "../api/conversationService";
import { useAuth } from "../context/useAuth";
import { getRecipient } from "../utils/helpers";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import EmptyState from "./EmptyState";

const conversationService = new ConversationService();

export default function Conversation() {
  const [recipient, setRecipient] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { token, currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    async function load() {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [currentUser, id, token]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!message) return;
    setLoading(true);
    try {
      const newMessage = await conversationService.sendMessage(
        token,
        id,
        message,
      );
      console.log(newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
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
      <h2>Conversation with {recipient}</h2>
      <div className="flex-col justify-between">
        <ul className="chat-messages flex-col gap-6">
          {messages.length === 0 ? (
            <EmptyState
              title="No messages yet"
              message="Send the first message to start this conversation."
            />
          ) : (
            messages.map((message) => (
              <div className="flex gap-2 items-center" key={message.id}>
                <small>
                  {message.senderId === currentUser.id ? "You" : recipient}
                </small>
                <p>{message.content}</p>

                <br />
              </div>
            ))
          )}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a message"
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
}
