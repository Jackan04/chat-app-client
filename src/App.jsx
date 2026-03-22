import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

export default function App() {
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
