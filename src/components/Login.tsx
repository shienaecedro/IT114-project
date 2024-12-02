import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import ChatIcon from "./ChatIcon";
import { Item } from "../types";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../assets/logo.png'; // Import your logo image

interface LoginProps {
  onLogin: (username: string, userRole: string) => void;
  items: Item[];
}

const Login: React.FC<LoginProps> = ({ onLogin, items }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      onLogin(username, role);
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <div className="logo-container">
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
        </div>
      </div>
      <div className="right-side">
        <Form className="login-form">
          <h2 className="text-center mb-4">Login</h2>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <DropdownButton
            id="dropdown-role"
            title={`${role}`}
            className="mt-3 custom-dropdown center-dropdown"
          >
            <Dropdown.Item onClick={() => setRole("user")}>User</Dropdown.Item>
            <Dropdown.Item onClick={() => setRole("admin")}>Admin</Dropdown.Item>
          </DropdownButton>
          <Button variant="warning" className="mt-4 w-100" onClick={handleLogin}>
            Login
          </Button>
          <Form.Text className="create-account-link mt-3">
            Don’t have an account? <a className="highlighted-link" onClick={() => navigate("/register")}>Sign Up</a>.
          </Form.Text>
        </Form>
        <ChatIcon items={items} />
      </div>
    </div>
  );
};

export default Login;
