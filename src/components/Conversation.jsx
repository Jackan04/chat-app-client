import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ConversationService from "../api/conversationService";
import { useAuth } from "../context/useAuth";
import { getRecipient } from "../utils/helpers";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import EmptyState from "./EmptyState";
import { useNavigate } from "react-router-dom";

const conversationService = new ConversationService();

export default function Conversation() {
  const [recipient, setRecipient] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { token, currentUser } = useAuth();
  const navigate = useNavigate();

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
      <button className="btn-ghost w-fit" onClick={() => navigate(-1)}>
        Go back
      </button>
      <h2>Conversation with {recipient}</h2>
      <div>
        <ul className="chat-messages flex-col gap-6">
          {messages.length === 0 ? (
            <EmptyState
              title="No messages yet"
              message="Send the first message to start this conversation."
            />
          ) : (
            messages.map((message) => (
              <div
                className={`
                  flex
                  gap-2
                  ${message.senderId === currentUser.id ? "justify-end" : ""}
                `}
                key={message.id}
              >
                <p
                  className={`
                    p-3
                    rounded-full
                    ${
                      message.senderId === currentUser.id
                        ? "bg-success"
                        : "bg-surface"
                    }
                      `}
                >
                  {message.content}
                </p>

                <br />
              </div>
            ))
          )}
        </ul>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mt-4">
            <input
              type="text"
              placeholder="Enter a message"
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </section>
  );
}
