import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Nav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav data-topnav className="hstack justify-between">
      <Link to="/">Chat App</Link>
      <menu className="hstack">
        {isAuthenticated && (
          <>
            <NavLink className="button outline" to="/">
              <i className="fa-solid fa-comments"></i>
              Conversations
            </NavLink>

            <NavLink className="button outline" to="/conversations/new">
              <i className="fa-solid fa-plus"></i>
              Conversation
            </NavLink>

            <NavLink to="/profile">
              <figure data-variant="avatar">
                <i className="fa-solid fa-user"></i>
              </figure>
            </NavLink>
          </>
        )}

        {!isAuthenticated && (
          <>
            <NavLink className="button outline" to="/login">
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              Login
            </NavLink>

            <NavLink className="button outline" to="/register">
              <i className="fa-solid fa-user"></i>
              Register
            </NavLink>
          </>
        )}
      </menu>
    </nav>
  );
}
