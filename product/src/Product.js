import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api";
export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 NEW

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`).then((res) => setProducts(res.data));
  }, []);

  // 🔍 FILTER BY PRODUCT NAME
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>All Products</h3>

      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍Search product by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-danger fw-bold">
                No products found.
              </td>
            </tr>
          ) : (
            filteredProducts.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={p.image}
                    width="60"
                    height="60"
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}