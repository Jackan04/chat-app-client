import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import ConversationList from "./components/ConversationList.jsx";
import Conversation from "./components/Conversation.jsx";
import NewConversation from "./components/NewConversation.jsx";
import Profile from "./components/Profile.jsx";
import NotFound from "./components/NotFound.jsx";

const routes = [
  {
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <NotFound /> },
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <ConversationList /> },
          { path: "/conversations/:id", element: <Conversation /> },
          { path: "/conversations/new", element: <NewConversation /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
];

export default routes;
