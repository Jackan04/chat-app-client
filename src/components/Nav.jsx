import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Nav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="flex justify-between items-center">
      <Link to="/">Chat App</Link>
      <ul className="flex items-center gap-2">
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/">Conversations</NavLink>
            </li>
            <li>
              <NavLink to="/conversations/new">New Conversation</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </>
        )}

        {!isAuthenticated && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
