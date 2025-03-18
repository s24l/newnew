import { useState } from "react";
import Register from "../components.js/Register";
import Login from "../components.js/Login";

export default function Home() {
  const [showRegister, setShowRegister] = useState(true);

  return (
    <div>
      {showRegister ? <Register /> : <Login />}
    </div>
  );
}
