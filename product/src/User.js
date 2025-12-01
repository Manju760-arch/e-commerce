import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './user.css';

export default function User({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
const getProgressWidth = (status) => {
  switch (status) {
    case "Ordered":
      return "25%";
    case "Shipped":
      return "50%";
    case "Out for Delivery":
      return "75%";
    case "Delivered":
      return "100%";
    default:
      return "0%";
  }
};

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch user orders from backend
  useEffect(() => {
  if (!user) return;
  axios.get(`/api/orders/user/${user._id}`)

    .then(res => setOrders(res.data)) // use res.data directly
    .catch(err => console.error(err));
}, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCancelOrder = async (orderId) => {
  if (!user) return;
  try {
    const res = await axios.delete(`/api/orders/delete/${orderId}`)

    setOrders(res.data.orders || []);
  } catch (err) {
    console.error("Failed to cancel order:", err.response || err);
    alert("Failed to cancel order");
  }
};


  if (!user) return null;

  return (
    <div className="user-container">
      <div className="profile">
        <p className="text">Welcome to MyStore🛍️</p>
        <div className="emoji">👤</div>
        <h2>User Profile</h2>
        <div className="box">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-dark"
        >
          Logout
        </button>
      </div>

      <div className="order">
        <h2>🛒 My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
         <div className="orders-container">
  {orders.map((order, index) => {

    const orderTotal = order.items.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    return (
      <div key={order._id} className="order-card">
        <h3>Order #{index + 1}</h3>

        <ul>
          {order.items.map((item, i) => (
            <li key={i}>
              {item.name} ({item.size}) - ${item.price} × {item.quantity || 1}
            </li>
          ))}
        </ul>

        <h4 className="mt-2"><strong>Total:</strong> ${orderTotal}</h4>

        <div className="tracking-container">
          <h4>Order Tracking</h4>
          <div className="tracking-bar">
           <div
  className="tracking-progress"
  style={{ width: getProgressWidth(order.status) }}
></div>
</div>
         <div className="tracking-steps">
  <span className={order.status === "Ordered" || order.status === "Shipped" || order.status === "Out for Delivery" || order.status === "Delivered" ? "active" : ""}>Ordered</span>

  <span className={order.status === "Shipped" || order.status === "Out for Delivery" || order.status === "Delivered" ? "active" : ""}>Shipped</span>

  <span className={order.status === "Out for Delivery" || order.status === "Delivered" ? "active" : ""}>Out for Delivery</span>

  <span className={order.status === "Delivered" ? "active" : ""}>Delivered</span>
</div>

        </div>

        <button
          onClick={() => handleCancelOrder(order._id)}
          className="btn btn-danger mt-2"
        >
          Cancel Order
        </button>
      </div>
    );
  })}
</div>

        )}
      </div>
    </div>
  );
}