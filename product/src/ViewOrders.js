import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api";
export default function AdminViewOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  // NEW

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/orders`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/orders/status/${orderId}`, { status: newStatus });

      setOrders(prev =>
        prev.map(o =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.log("Status update failed:", err);
    }
  };

  // 🔍 FILTER ORDERS BY USER NAME
  const filteredOrders = orders.filter(order =>
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="admin-orders-page">
        <h2>All Orders</h2>

        {/* 🔍 SEARCH BAR */}
        <input
          type="text"
          placeholder="🔍Search by user name..."
          className="form-control mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Items</th>
              <th>Total</th>
              <th>Size</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-danger fw-bold">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => {
                const total = order.items.reduce(
                  (sum, i) => sum + i.price * i.quantity,
                  0
                );

                return (
                  <tr key={order._id}>
                    <td>{order.user?.name}</td>

                    <td>
                      {order.items.map((it, index) => (
                        <div key={index}>{it.name} × {it.quantity}</div>
                      ))}
                    </td>

                    <td>
                      <span className="badge bg-success fs-6">
                        ₹{total}
                      </span>
                    </td>

                    <td>
                      {order.items.map((it, index) => (
                        <span key={index} className="badge bg-secondary mx-1">
                          {it.size}
                        </span>
                      ))}
                    </td>

                    <td>
                      <span className="badge bg-info text-dark p-2">
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="form-select"
                      >
                        <option>Ordered</option>
                        <option>Shipped</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}