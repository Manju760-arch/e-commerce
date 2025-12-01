import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './register.css';
import { API_BASE_URL } from "./api";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // prevent default form submission

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed due to server error");
    }
  };

  return (
    <div className="register-container">
      <p className="text">Welcome to MyStore🛍️</p>
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            placeholder="Enter your Name"
            type="text"
            className="register-name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            placeholder="Enter your Email"
            type="email"
            className="register-email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            placeholder="Enter your Password"
            type="password"
            className="register-password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" className="register">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}