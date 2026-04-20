import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Take off the wristband
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2">
                        <li className="nav-item">
                            <Link className="nav-link active fs-5" to="/">Home</Link>
                        </li>
                        {(localStorage.getItem("authToken")) ?
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" to="/orderData">My Orders</Link>
                            </li> : ""}
                    </ul>
                    {(!localStorage.getItem("authToken")) ?
                        <div className="d-flex">
                            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                            <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                        </div>
                        : 
                        <div>
                            <Link className="btn bg-white text-success mx-2" to="/orderData">My Cart</Link>
                            <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
                        </div>}
                </div>
            </div>
        </nav>
    )
}