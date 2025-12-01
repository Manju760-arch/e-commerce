import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart({ user, cart, setCart, removeFromCart }) {
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // Fetch cart from backend on mount or when user changes
  useEffect(() => {
    if (!user) return;
    axios
      .get(`/api/cart/${user._id}`)
      .then((res) => setCart(res.data.items || []))
      .catch((err) => console.error(err));
  }, [user, setCart]);
if (!cart) return <p>Loading cart...</p>;

  const total = (cart || []).reduce(
  (sum, item) => sum + item.price * (item.quantity || 1), 
  0
);
const handleRemove = async (productId) => {
  await axios.delete(`/api/cart/${user._id}/${productId}`);
}
const handleIncrease = async (productId, size) => {
  const res = await axios.put(`/api/cart/${user._id}/increase/${productId}/${size}`);
  setCart(res.data.items);
};

const handleDecrease = async (productId, size) => {
  const res = await axios.put(`/api/cart/${user._id}/decrease/${productId}/${size}`);
  setCart(res.data.items);
};

  const handleConfirmOrder = async (e) => {
  e.preventDefault();
  if (!user) return alert("Please login first");
  if (cart.length === 0) return alert("Cart is empty!");

  try {
    const res = await axios.post(`/api/orders/user/${user._id}`, {
  items: cart,
  address,
  phone,
});

    console.log("Order response:", res.data);
    alert("Order placed successfully!");
    setCart([]);
    setShowForm(false);
    navigate("/user");
  } catch (err) {
    console.error("Error placing order:", err.response || err);
    alert("Failed to place order");
  }
};


  if (!user) {
    return <p>Please login to view your cart.</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Cart Items</h3>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                <td>
  <button 
    className="btn btn-sm btn-secondary" 
    onClick={() => handleDecrease(item.product, item.size)}
  >-</button>

  <span className="mx-2">{item.quantity}</span>

  <button 
    className="btn btn-sm btn-secondary" 
    onClick={() => handleIncrease(item.product, item.size)}
  >+</button>
</td>

              <td>{item.size}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item.product)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: ${total}</h4>
          <button className="btn btn-success" onClick={() => setShowForm(true)}>
            Buy Now
          </button>
        </>
      )}

      {showForm && (
        <form onSubmit={handleConfirmOrder} className="mt-3">
          <h4>Enter Information for placing order</h4>
          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="form-control mb-2"
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="form-control mb-2"
          />
          <label>
            Payment Options:
            <input type="text" 
            value="Cash on Delivery"
            readOnly 
            className="form-control mb-2"/>
          </label>
          <br />
          <button type="submit" className="btn btn-primary">
            Confirm Order
          </button>
        </form>
      )}
    </div>
  );
}