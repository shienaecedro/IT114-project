import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import ChatIcon from "./ChatIcon";
import { Item } from "../types";
import "./Login.css";

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
    <Container className="login-container d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="welcome-text">
          CCIS Facility Booking and Borrowing System
        </h1>
        <Form className="login-form">
          <h2 className="text-center mb-4">Login</h2>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <DropdownButton
            id="dropdown-role"
            title={`Role: ${role}`}
            className="mt-3 custom-dropdown"
          >
            <Dropdown.Item onClick={() => setRole("user")}>User</Dropdown.Item>
            <Dropdown.Item onClick={() => setRole("admin")}>
              Admin
            </Dropdown.Item>
          </DropdownButton>
          <Button
            variant="warning"
            className="mt-4 w-100"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Form>
        <div className="mt-3">
          <Button variant="link" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
      </div>
      <ChatIcon items={items} /> {/* Pass items to ChatIcon */}
    </Container>
  );
};

export default Login;
