import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "./UserProfile.css";

interface UserProfileProps {
  user: {
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
    dateOfBirth: string;
    profilePicture: string;
  } | null; // Allow null initially
  updateUser: (updatedUser: any) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, updateUser }) => {
  const [userInfo, setUserInfo] = useState(() => {
    // Load from localStorage if available, otherwise use the user prop
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : user || null;
  });

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => {
      if (!prevInfo) return null; // Prevent spreading null
      return { ...prevInfo, [name]: value };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prevInfo) => {
          if (!prevInfo) return null; // Prevent spreading null
          return { ...prevInfo, profilePicture: reader.result as string };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo) {
      // Save to localStorage
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      updateUser(userInfo);

      // Show confirmation message
      setMessage("Profile saved successfully!");
      setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
    }
  };

  if (!userInfo) {
    return (
      <Container className="user-profile">
        <Row className="justify-content-md-center mt-4">
          <Col md={6}>
            <h2>User Profile</h2>
            <p>Loading user information...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="user-profile">
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
          <h2>User Profile</h2>
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="profilePicture">
              <div className="profile-picture">
                {userInfo.profilePicture ? (
                  <img
                    src={userInfo.profilePicture}
                    alt="Profile"
                    className="img-thumbnail"
                  />
                ) : (
                  <div className="profile-placeholder">Upload Photo</div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="form-control mt-2"
                />
              </div>
            </Form.Group>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={userInfo.fullName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={userInfo.dateOfBirth}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
