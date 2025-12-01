import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Products from "./Products";
import { API_BASE_URL } from "./api";
import Cart from "./Cart";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Admin from "./Admin";
import AdminDashboard from "./AdminDashboard";
import ManageUser from "./ManageUser";
import ViewOrders from "./ViewOrders";
import Product from "./Product";
export default function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <AppWrapper
        cart={cart}
        setCart={setCart}
        products={products}
        setProducts={setProducts}
      />
    </BrowserRouter>
  );
}

function AppWrapper({ cart, setCart, products, setProducts }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getUser = () => {
    const saved = localStorage.getItem("user");
    if (!saved || saved === "undefined") return null;
    try {
      return JSON.parse(saved);
    } catch (err) {
      console.error("Failed to parse user data:", err);
      return null;
    }
  };

  const user = getUser();

  // Fetch products
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))

      .catch((err) => console.error(err));
  }, []);

  // Fetch cart
  useEffect(() => {
    if (!user) return;
    fetch(`${API_BASE_URL}/api/cart/${user._id}`)
      .then((res) => res.json())
      .then((data) => setCart(data?.items || []))
      .catch((err) => console.error(err));
  }, [user]);
const addToCart = async (product, size) => {
  if (!user) {
    navigate("/login");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/cart/${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id,
        name: product.name,
        price: product.price,
          size: size, 
        quantity: 1
      }),
    });

    const data = await res.json();
    setCart(data.items);

    navigate("/cart");
  } catch (err) {
    console.error(err);
  }
};

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);

    if (!user) return;

    try {
      await fetch(`${API_BASE_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, cart: updatedCart }),
      });
    } catch (err) {
      console.error("Failed to update cart on server:", err);
    }
  };

  const hideNavbarOn = ["/", "/login", "/register"];
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar cart={cart} />}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
        <Route
  path="/products/:productId"
  element={<ProductDetails addToCart={addToCart} />}
/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/vieworders" element={<ViewOrders />} />

        <Route path="/admin/manageuser" element={<ManageUser />} />
        <Route path="/admin/product" element={<Product />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/cart" element={<Cart user={user} cart={cart} setCart={setCart} removeFromCart={removeFromCart} />} />
        <Route path="/user" element={<User user={user} />} />
      </Routes>
    </>
  );
}