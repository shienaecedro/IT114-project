import React, { useState } from "react";
import { Card, Button, Form, Modal, Pagination, Row, Col, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "./Dashboard.css";

interface Facility {
  id: number;
  name: string;
  location: string;
  available: boolean;
  image?: string;
}

interface AdminFacilitiesProps {
  facilities: Facility[];
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>;
}

const AdminFacilities: React.FC<AdminFacilitiesProps> = ({ facilities, setFacilities }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentFacility, setCurrentFacility] = useState<Partial<Facility>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState<string>("all"); // "all", "available", "occupied"

  const handleShowModal = (facility?: Facility) => {
    setCurrentFacility(facility || {});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveFacility = () => {
    if (currentFacility.id) {
      setFacilities(
        facilities.map((facility) =>
          facility.id === currentFacility.id ? (currentFacility as Facility) : facility
        )
      );
    } else {
      setFacilities([
        ...facilities,
        { ...currentFacility, id: facilities.length + 1, available: true } as Facility,
      ]);
    }
    handleCloseModal();
  };

  const handleDeleteFacility = (id: number) => {
    setFacilities(facilities.filter((facility) => facility.id !== id));
  };

  const handleMakeAvailable = (facility: Facility) => {
    setFacilities(
      facilities.map((f) =>
        f.id === facility.id ? { ...f, available: true } : f
      )
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentFacility((prevInfo) => ({
          ...prevInfo,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const itemsPerPage = 9; // Adjust this as needed
  const totalPages = Math.ceil(facilities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter facilities based on the selected availability status
  const filteredFacilities =
    filterStatus === "all"
      ? facilities
      : facilities.filter((facility) => (filterStatus === "available" ? facility.available : !facility.available));

  const paginatedFacilities = filteredFacilities.slice(startIndex, endIndex);

  return (
    <div className="container-fluid">
      <h2 className="header-text">Facilities</h2>
      
      {/* Filter Dropdown */}
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          as="select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-auto"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
        </Form.Control>

        <Button onClick={() => handleShowModal()} className="btn-orange">
          <FaPlus className="me-2" /> Add Facility
        </Button>
      </div>

      <Row>
        {paginatedFacilities.map((facility) => (
          <Col key={facility.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card className="small-card">
              {facility.image && <Card.Img variant="top" src={facility.image} />}
              <Card.Body>
                <Card.Title>{facility.name}</Card.Title>
                <Card.Text>
                  <Badge bg="secondary" className="me-2">
                    {facility.location}
                  </Badge>
                  <Badge bg={facility.available ? "success" : "danger"} className="me-2">
                    Availability: {facility.available ? "Available" : "Occupied"}
                  </Badge>
                  <div className="d-flex justify-content-end mt-3">
                    <Button size="sm" className="btn-orange me-2" onClick={() => handleShowModal(facility)}>
                      <FaEdit className="text-white" />
                    </Button>
                    <Button size="sm" className="btn-orange" onClick={() => handleDeleteFacility(facility.id)}>
                      <FaTrash className="text-white" />
                    </Button>
                    {!facility.available && (
                      <Button
                        size="sm"
                        className="btn-orange mt-2"
                        onClick={() => handleMakeAvailable(facility)}
                      >
                        Make Available
                      </Button>
                    )}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentFacility.id ? "Edit Facility" : "Add Facility"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentFacility.name || ""}
                onChange={(e) =>
                  setCurrentFacility({
                    ...currentFacility,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={currentFacility.location || ""}
                onChange={(e) =>
                  setCurrentFacility({
                    ...currentFacility,
                    location: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <div className="facility-image">
                {currentFacility.image ? (
                  <img src={currentFacility.image} alt="Facility" width="100" />
                ) : (
                  <div className="facility-placeholder">Upload Image</div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="form-control"
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveFacility}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminFacilities;
