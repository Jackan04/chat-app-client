import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={<h2>Login</h2>} />
        <Route path="/register" element={<h2>Register</h2>} />

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
