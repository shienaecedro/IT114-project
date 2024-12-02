import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "./Global.css"; // Import global styles

interface Facility {
  id: number;
  name: string;
  availability: string;
}

const Facilities: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([
    { id: 1, name: "Auditorium", availability: "Available" },
    { id: 2, name: "Computer Lab 1", availability: "Available" },
    { id: 3, name: "Computer Lab 2", availability: "Occupied" },
    { id: 4, name: "Computer Lab 3", availability: "Available" },
    { id: 5, name: "Computer Lab 4", availability: "Available" },
    { id: 6, name: "Computer Lab 5", availability: "Occupied" },
    { id: 7, name: "Computer Lab 6", availability: "Available" },
    { id: 8, name: "Computer Lab 7", availability: "Available" },
    { id: 9, name: "Computer Lab 8", availability: "Occupied" },
    { id: 10, name: "Computer Lab 9", availability: "Available" },
    { id: 11, name: "Computer Lab 10", availability: "Occupied" },
    { id: 12, name: "Discussion Room", availability: "Available" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );
  const [userName, setUserName] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  const handleShowModal = (facility: Facility) => {
    setSelectedFacility(facility);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFacility(null);
  };

  const handleBooking = () => {
    if (selectedFacility) {
      setFacilities(
        facilities.map((facility) =>
          facility.id === selectedFacility.id
            ? { ...facility, availability: "Occupied" }
            : facility
        )
      );
      alert(
        `Facility ${selectedFacility.name} booked successfully for ${userName} on ${bookingDate}`
      );
      handleCloseModal();
    }
  };

  return (
    <Container className="page-container">
      <Row>
        <Col md={12} className="content-card">
          <h1 className="page-title">Facilities</h1>
          <Table bordered hover responsive className="facility-table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility) => (
                <tr
                  key={facility.id}
                  className={
                    facility.availability === "Available"
                      ? "available-row"
                      : "occupied-row"
                  }
                >
                  <td>{facility.name}</td>
                  <td>{facility.availability}</td>
                  <td>
                    {facility.availability === "Available" && (
                      <Button
                        variant="warning"
                        onClick={() => handleShowModal(facility)}
                      >
                        Book
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFacility && (
            <Form>
              <Form.Group controlId="formUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBookingDate">
                <Form.Label>Booking Date</Form.Label>
                <Form.Control
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </Form.Group>
              <Button variant="warning" onClick={handleBooking}>
                Book
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Facilities;
