import { Link} from "react-router-dom";
import "./admindashboard.css";
export default function AdminDashboard() {
  return (
    <div className="container mt-4">
        <p className="text">Welcome to MyStore🛍️</p>
      <h2 className="adminhead">Admin Dashboard</h2>

      <ul className="admincontainer">
        <li className="adminlink"><Link className="decor" to="/admin/manageuser">Manage Users</Link></li>
        <li className="adminlink"><Link className="decor" to="/admin/product">Product</Link></li>
        <li className="adminlink"><Link className="decor" to="/admin/vieworders">View Orders</Link></li>
      </ul>
    </div>
  );
}
