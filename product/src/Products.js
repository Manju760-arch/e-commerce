
import { useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import './product.css'
export default function Products({ products, addToCart }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
   const [deliveryDates, setDeliveryDates] = useState({});
  const navigate = useNavigate();
  // Returns a random date string, e.g., "Expected delivery: 5 Dec 2025"
useEffect(() => {
    const dates = {};
    products.forEach((p) => {
      const today = new Date();
      const randomDays = Math.floor(Math.random() * 6) + 2; // 2 to 7 days
      today.setDate(today.getDate() + randomDays);
      const options = { day: "numeric", month: "short", year: "numeric" };
      dates[p._id] = today.toLocaleDateString("en-US", options);
    });
    setDeliveryDates(dates);
  }, [products]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filter === "All" ? true : p.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-4">

      {/* ⭐ CAROUSEL FIRST */}
      <div id="heroCarousel" className="carousel slide mb-4" data-bs-ride="carousel">

        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner rounded">

          <div className="carousel-item active">
            <img
              src="/images/chi.avif"
              className="d-block w-100 carousel-img"
              alt="Kids Fashion"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Kids Fashion Sale</h5>
              <p>Trendy styles for boys and girls</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/images/b.avif"
              className="d-block w-100 carousel-img"
              alt="Boys Wear"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Boys Wear Collection</h5>
              <p>Comfortable and stylish outfits</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/images/g.avif"
              className="d-block w-100 carousel-img"
              alt="Girls Wear"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Girls Wear Collection</h5>
              <p>Pretty dresses & accessories</p>
            </div>
          </div>

        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>

      {/* ⭐ NOW PRODUCTS HEADING */}
      <h2 className="mb-4">Products</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search products..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="BoysWear">Boys Wear</option>
            <option value="GirlsWear">Girls Wear</option>
            <option value="GirlAccessories">Girl Accessories</option>
            <option value="BoyAccessories">Boy Accessories</option>
            <option value="BabyDress">Baby Dress</option>
            <option value="BabyAccessories">Baby Accessories</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredProducts.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div
              className="card shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/products/${p._id}`)}
            >
              <img
                src={p.image}
                className="card-img-top"
                alt={p.name}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-muted">{p.content}</p>
                <h6 className="mb-2">${p.price}</h6>
                <p className="text-success mb-2" style={{ fontSize: "15px" }}>
                  🚛Expected Delivery: {deliveryDates[p._id]}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <h4 className="text-center text-muted mt-4">No products found</h4>
        )}
      </div>

    </div>
  );
}
