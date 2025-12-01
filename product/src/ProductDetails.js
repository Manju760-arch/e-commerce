import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./productdetails.css";
import { API_BASE_URL } from "./api";
export default function ProductDetails({ addToCart }) {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
       const res = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
setProduct(res.data);

const all = await axios.get(`${API_BASE_URL}/api/products`);
 // Filter same category except itself
        const related = all.data.filter(
          (p) =>
            p.category === res.data.category &&
            p._id !== res.data._id
        );

        setSuggested(related);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="container mt-4">

      {/* Product Section */}
      <div className="card mb-5">
        <img
          src={product.image}
          alt={product.name}
          style={{ height: "300px", objectFit: "cover" }}
          className="card-img-top"
        />

        <div className="card-body">
          <h3>{product.name}</h3>
          <p className="text-muted">{product.content}</p>
          <h4>₹{product.price}</h4>
        
          <button
            className="btn btn-dark"
            onClick={() => {
              if (!selectedSize) {
                alert("Please select a size!");
                return;
              }
              addToCart(product, selectedSize);
            }}
          >
            Add to Cart 🛒
          </button>

          <div className="sizes mt-3">
            {product.description.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`btn me-2 mb-2 ${
                  selectedSize === size ? "btn-dark" : "btn-outline-dark"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Products Section */}
      <h4 className="mb-3">You may also like</h4>

      <div className="row">
        {suggested.length === 0 && <p>No related products found.</p>}

        {suggested.map((item) => (
          <div className="col-6 col-md-4 col-lg-3 mb-4" key={item._id}>
            <Link to={`/products/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="card h-100">
                <img
                  src={item.image}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                  alt={item.name}
                />
                <div className="card-body">
                  <h6>{item.name}</h6>
                  <p className="text-muted">₹{item.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
