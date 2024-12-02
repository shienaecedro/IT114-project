import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./Register.css"; // Import the custom styles

interface RegisterProps {
  onRegister: (username: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idNumber, setIdNumber] = useState(""); // New state for idNumber
  const [schoolEmail, setSchoolEmail] = useState(""); // New state for schoolEmail
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Sample data for ID numbers and school emails
  const sampleIdNumbers = ["123456", "654321"]; // Sample ID numbers
  const sampleEmails = ["student1@school.edu", "student2@school.edu"]; // Sample emails

  const handleRegister = () => {
    if (
      !sampleIdNumbers.includes(idNumber) ||
      !sampleEmails.includes(schoolEmail)
    ) {
      // Check if idNumber and schoolEmail are valid
      setError("Invalid ID Number or School Email.");
      return; // Stop the registration if invalid
    }

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

          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formIdNumber" className="mt-3">
            <Form.Label>ID Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ID Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formSchoolEmail" className="mt-3">
            <Form.Label>School Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter School Email"
              value={schoolEmail}
              onChange={(e) => setSchoolEmail(e.target.value)}
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
