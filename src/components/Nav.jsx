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
                <i className="fa-solid fa-comments"></i>
                Conversations
              </NavLink>
            </li>
            <li>
              <NavLink className="button outline" to="/conversations/new">
                <i className="fa-solid fa-plus"></i>
                Conversation
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <figure data-variant="avatar">
                  <i className="fa-solid fa-user"></i>
                </figure>
              </NavLink>
            </li>
          </>
        )}

        {!isAuthenticated && (
          <>
            <li>
              <NavLink className="button outline" to="/login">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="button outline" to="/register">
                <i className="fa-solid fa-user"></i>
                Register
              </NavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
