import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "./Register.css"; // Import the custom styles

interface RegisterProps {
  onRegister: (username: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username && password) {
      const newUser = { id: Date.now(), username, password, role: "user" }; // Define a new user object
      const users = JSON.parse(localStorage.getItem("users") || "[]"); // Retrieve existing users from localStorage
      localStorage.setItem("users", JSON.stringify([...users, newUser])); // Save the new user to localStorage
      onRegister(username, password);
      alert("Registered successfully!");
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <Container className="register-container d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="welcome-text">
          CCIS Facility Booking and Borrowing System
        </h1>
        <Form className="register-form">
          <h2 className="text-center mb-4">Register</h2>
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
          <Button
            variant="warning"
            className="mt-4 w-100"
            onClick={handleRegister}
          >
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
