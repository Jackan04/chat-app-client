import { Outlet, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Nav from "./components/Nav";
import ConversationList from "./components/ConversationList";

function AppLayout() {
  return (
    <div className="container">
      <header>
        <Nav />
      </header>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route index element={<ConversationList />} />
          <Route path="/conversations/:id" element={<h2>Conversation</h2>} />
          <Route
            path="/conversations/new"
            element={<h2>New Conversation</h2>}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
