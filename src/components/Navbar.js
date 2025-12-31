import React from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaHome, FaInfoCircle, FaGamepad } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav style={{
            padding: "10px 20px",
            background:"#282c34",
            color:"white",
            display:"flex",
            gap:"20px"
        }}>
            <Link to="/" style={{ color: "white", textDecoration:"none"}}>
            <FaHome /> Home
            </Link>
            <Link to="/wishlist" style={{ color: "white", textDecoration:"none"}}>
            <FaBookmark />Wishlist
            </Link>
            <Link to="/free-games" style={{ color: "white", textDecoration:"none"}}>
            <FaGamepad /> Free Games
            </Link>
            <Link to="/about" style={{ color: "white", textDecoration:"none"}}>
            <FaInfoCircle /> About
            </Link>
        </nav>
    );
};

export default Navbar;