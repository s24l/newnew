import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !password || !code) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Registered successfully! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <motion.div 
      className="bg-gray-900 min-h-screen flex justify-center items-center text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 mb-2 bg-gray-700 rounded"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-2 bg-gray-700 rounded"
        />
        <input 
          type="text" 
          placeholder="Pre-Assigned Code" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="block w-full p-2 mb-2 bg-gray-700 rounded"
        />
        <button 
          onClick={handleRegister} 
          className="bg-blue-500 px-4 py-2 rounded w-full mt-2"
        >
          Register
        </button>
      </div>
    </motion.div>
  );
}
