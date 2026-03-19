import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ConversationService from "../api/conversationService";
import { useAuth } from "../context/useAuth";
import { getRecipient } from "../utils/helpers";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import EmptyState from "./EmptyState";
import PageHeader from "./PageHeader";

const conversationService = new ConversationService();

export default function Conversation() {
  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef(null);
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

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <section className="container">
      <PageHeader title={recipient?.displayName} />
      <div className="chat-wrapper">
        <div className="messages-container" ref={messagesContainerRef}>
          <ul className="unstyled vstack">
            {messages.length === 0 ? (
              <EmptyState
                title="No messages yet"
                message="Send the first message to start this conversation."
              />
            ) : (
              messages.map((message) => {
                const isSent = message.senderId === currentUser.id;
                return (
                  <div
                    className={isSent ? "hstack justify-end" : "hstack"}
                    key={message.id}
                  >
                    <p
                      className={`message ${isSent ? "message-sent" : "message-received"}`}
                    >
                      {message.content}
                    </p>

                    <br />
                  </div>
                );
              })
            )}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="hstack">
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
