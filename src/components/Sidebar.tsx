import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo.png';
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <Nav.Link
                as={Link}
                to="/dashboard"
                className={`nav-link ${
                  location.pathname === "/dashboard" ? "active-link" : ""
                }`}
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </Nav.Link>
              <div className="sb-sidenav-menu-heading">Admin</div>
              <Nav.Link
                as={Link}
                to="/admin/items"
                className={`nav-link ${
                  location.pathname === "/admin/items" ? "active-link" : ""
                }`}
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-box"></i>
                </div>
                Items
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/admin/facilities"
                className={`nav-link ${
                  location.pathname === "/admin/facilities" ? "active-link" : ""
                }`}
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-building"></i>
                </div>
                Facilities
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/admin/users"
                className={`nav-link ${
                  location.pathname === "/admin/users" ? "active-link" : ""
                }`}
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users"></i>
                </div>
                Manage Users
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/admin/transactions"
                className={`nav-link ${
                  location.pathname === "/admin/transactions" ? "active-link" : ""
                }`}
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-exchange-alt"></i>
                </div>
                Transactions
              </Nav.Link>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            Start Bootstrap
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
