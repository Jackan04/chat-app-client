import { useContext } from "react";
import { AuthContext } from "./auth-context.js";

const useAuth = () => useContext(AuthContext);

export { useAuth };
