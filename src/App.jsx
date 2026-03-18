import { Outlet, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Nav from "./components/Nav";
import ConversationList from "./components/ConversationList";
import Conversation from "./components/Conversation";
import NewConversation from "./components/NewConversation";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

function AppLayout() {
  return (
    <div className="vstack">
      <header className="container">
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
          <Route index element={<ConversationList />} />
          <Route path="/conversations/:id" element={<Conversation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/conversations/new" element={<NewConversation />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
