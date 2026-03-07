import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav>
            {!isAuthenticated ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <Link to="/getProduct">Products</Link>
                    <Link to="/addProduct">Add Product</Link>
                    {user?.role === "admin" && (
                        <Link to="/getUsers">Users</Link>
                    )}
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </nav>
    );
};
export default Navbar;
