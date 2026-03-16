import { useState } from "react";
import UserService from "../api/userService";
import { useAuth } from "../context/useAuth";

const userService = new UserService();

export default function NewConversation() {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const result = await userService.getUserByUsername(token, searchQuery);
      console.log(result);

      setUsers(result);
    } catch (error) {
      setError(error.message);
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a user"
            id="user"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <ul>
        {users.length > 0 && users.map((user) => <li>{user.username}</li>)}
      </ul>
    </>
  );
}
