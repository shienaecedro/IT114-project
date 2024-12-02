import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.png"; // Ensure this path is correct
import "./Sidebar.css"; // Make sure you have Sidebar.css

const Sidebar: React.FC = () => {
  const location = useLocation();
  console.log("Current path:", location.pathname); // Debugging log

  return (
    <div className="sidebar d-flex flex-column bg-dark text-light vh-100">
      <div className="text-center mt-4">
        <img src={logo} alt="TechTrack Logo" className="sidebar-logo" />
      </div>
      <h2 className="text-center mt-2">TechTrack</h2>
      <Nav className="flex-column mt-5">
        <Nav.Link
          as={Link}
          to="/dashboard"
          className={`text-light ${
            location.pathname === "/dashboard" ? "active-link" : ""
          }`}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/items"
          className={`text-light ${
            location.pathname === "/admin/items" ? "active-link" : ""
          }`}
        >
          Items
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/facilities"
          className={`text-light ${
            location.pathname === "/admin/facilities" ? "active-link" : ""
          }`}
        >
          Facilities
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/users"
          className={`text-light ${
            location.pathname === "/admin/users" ? "active-link" : ""
          }`}
        >
          Manage Users
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/transactions"
          className={`text-light ${
            location.pathname === "/admin/transactions" ? "active-link" : ""
          }`}
        >
          Transactions
        </Nav.Link>
      </Nav>
      <Nav className="mt-auto mb-3">
        <Nav.Link
          as={Link}
          to="/logout"
          className={`text-light ${
            location.pathname === "/logout" ? "active-link" : ""
          }`}
        >
          Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
