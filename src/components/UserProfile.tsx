import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "./UserProfile.css";

interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
}

interface UserProfileProps {
  user: User | null; // Allow null initially
  updateUser: (updatedUser: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, updateUser }) => {
  const defaultUserInfo: User = {
    fullName: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
  };

  const [userInfo, setUserInfo] = useState<User>(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : user || defaultUserInfo;
  });

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserInfo(user);
      localStorage.setItem("userInfo", JSON.stringify(user)); // Keep localStorage in sync
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setUserInfo((prevInfo) => ({
            ...prevInfo,
            profilePicture: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Save to localStorage
      updateUser(userInfo); // Call the updateUser function
      setMessage("Profile saved successfully!");
      setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <Container className="user-profile d-flex align-items-center justify-content-center vh-100">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">User Profile</h2>
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="profilePicture" className="text-center">
              <div className="profile-picture-container">
                {userInfo.profilePicture ? (
                  <img
                    src={userInfo.profilePicture}
                    alt="Profile"
                    className="profile-picture img-thumbnail"
                  />
                ) : (
                  <div className="profile-placeholder">Upload Photo</div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                  aria-label="Upload profile picture"
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
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
