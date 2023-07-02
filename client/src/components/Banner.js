import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAppContext } from "../context/context";
import { links } from "../assets/links";
import { FiMenu } from "react-icons/fi";

const Banner = () => {
  const { logoutUser } = useAppContext();
  const [showMenu, setShowMenu] = useState(false);
  const toggle = () => {
    setShowMenu(!showMenu);
  };
  return (
    <nav className="navbar">
      <section className="nav-center">
        <div className="nav-header">
          <h2 className="logo">
            <Link to="/" style={{ textDecoration: "none", color: "#10c79c" }}>
              Study  Tracker
            </Link>
          </h2>
          <FiMenu
            size={24}
            color={"white"}
            onClick={toggle}
            className="nav-btn"
          />
        </div>
        <div className={`nav-links ${showMenu ? "show-links" : ""}`}>
          {links.map((item) => {
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className="nav-link"
                onClick={toggle}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#10c79c" : "white",
                    fontWeight: isActive ? 500 : 400,
                  };
                }}
              >
                {item.text}
              </NavLink>
            );
          })}
          <div className="nav-link logout-btn">
            <button className="btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Banner;
