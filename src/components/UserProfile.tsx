import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./UserProfile.css"; // Import the CSS file

interface UserProfileProps {
  user: {
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
    dateOfBirth: string;
    profilePicture: string;
  };
  updateUser: (updatedUser: any) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, updateUser }) => {
  const [userInfo, setUserInfo] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(userInfo); // Update user information
  };

  return (
    <Container className="user-profile">
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
          <h2>User Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="profilePicture">
              <div className="profile-picture">
                {userInfo.profilePicture ? (
                  <img src={userInfo.profilePicture} alt="Profile" />
                ) : (
                  <div className="profile-placeholder">Upload Photo</div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="form-control"
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
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleChange}
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={userInfo.dateOfBirth}
                onChange={handleChange}
                className="form-control"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="btn-primary mt-3"
            >
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
