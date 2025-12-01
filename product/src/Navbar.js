import { Link } from "react-router-dom";
import './navbar.css'
export default function Navbar({cart}){
    return(
        <div className="navbar-container">
            <div className="item">
                <Link className="brand" to="/about">🛍️
        My Store</Link>
                </div>
                <div className="item1">
                    <ul className="navbar">
                        
                        <li className="navitem">
                            <Link className="navlink" to="/admin">Admin</Link>
                            <Link className="navlink" to="/products">Products</Link>
                            <Link className="navlink" to="/cart">🛒 <span className="badge bg-dark text-white">({cart?.length || 0})
</span>  </Link>
                            <Link className="navlink" to="/user">👤</Link>
                      
                        </li>
                    </ul>
                    </div>
                    </div>
                  
    );
}