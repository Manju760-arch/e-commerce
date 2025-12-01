import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin123") {
      alert("Admin login successful!");
      navigate("/admindashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin">
      
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
     
    >
     
      <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "15px" }}>
        
        {/* LOGO */}
        <div className="text-center mb-3">
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "28px",
              color: "white",
              margin: "0 auto 10px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
            }}
          >
          🛍️
          </div>
          <h3 style={{ fontWeight: "600" }}>Admin Portal</h3>
          <p className="text-muted" style={{ fontSize: "14px" }}>
            Sign in to continue
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin}>
          <label className="form-label fw-bold">Email</label>
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Enter Email "
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="form-label fw-bold">Password</label>
          <input
            className="form-control mb-3"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="btn w-100 mt-2"
            style={{
              background: "#0d6efd",
              color: "white",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "8px",
            }}
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center mt-3 text-muted" style={{ fontSize: "13px" }}>
          © {new Date().getFullYear()} MyStore Admin
        </p>
      </div>
    </div>
    </div>
  );
}