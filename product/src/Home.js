// Home.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/products");   // or "/products"
    }, 10000); // 5 seconds

    return () => clearTimeout(timer);  
  }, []);

  return (
    <div className="home-container">
      <div className="logo">🛍️</div>
       </div>
  );
}