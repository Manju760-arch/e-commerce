import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { API_BASE_URL } from "./api";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent default form submission

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        navigate("/products"); // redirect to products page after login
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed due to server error");
    }
  };

  return (
    <div className="login-container">
      <p className="text">Welcome to MyStore🛍️</p>
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            className="email"
            placeholder="Enter your Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="password"
            type="password"
            placeholder="Enter your Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="submit" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}