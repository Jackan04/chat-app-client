import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Nav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav data-topnav className="hstack justify-between">
      <Link to="/">Chat App</Link>
      <menu className="buttons">
        {isAuthenticated && (
          <>
            <li>
              <NavLink className="button outline" to="/">
                Conversations
              </NavLink>
            </li>
            <li>
              <NavLink className="button outline" to="/conversations/new">
                New Conversation
              </NavLink>
            </li>
            <li>
              <NavLink className="button outline" to="/profile">
                Profile
              </NavLink>
            </li>
          </>
        )}

        {!isAuthenticated && (
          <>
            <li>
              <NavLink className="button outline" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="button outline" to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
