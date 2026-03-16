import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="container">
      <header>
        <Nav />
      </header>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/conversations" element={<h2>Conversations</h2>} />
          <Route path="/conversations/:id" element={<h2>Conversation</h2>} />
          <Route
            path="/conversations/new"
            element={<h2>New Conversation</h2>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
