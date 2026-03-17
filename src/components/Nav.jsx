import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Nav() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="flex justify-between items-center">
      <Link to="/">Chat App</Link>
      <ul className="flex items-center gap-2">
        {isAuthenticated && (
          <>
            <li className="btn">
              <NavLink to="/">Conversations</NavLink>
            </li>
            <li className="btn">
              <NavLink to="/conversations/new">New Conversation</NavLink>
            </li>
            <li className="btn">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
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
