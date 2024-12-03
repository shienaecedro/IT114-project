import React, { useState } from "react";
import { Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import "./Dashboard.css";

interface Facility {
  id: number;
  name: string;
  location: string;
  available: boolean;
  image?: string; // Add an optional image property
}

interface AdminFacilitiesProps {
  facilities: Facility[];
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>;
}

const AdminFacilities: React.FC<AdminFacilitiesProps> = ({
  facilities,
  setFacilities,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentFacility, setCurrentFacility] = useState<Partial<Facility>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

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
          facility.id === currentFacility.id
            ? (currentFacility as Facility)
            : facility
        )
      );
    } else {
      setFacilities([
        ...facilities,
        {
          ...currentFacility,
          id: facilities.length + 1,
          available: true,
        } as Facility,
      ]);
    }
    handleCloseModal();
  };

  const handleMakeAvailable = (facility: Facility) => {
    setFacilities(
      facilities.map((f) =>
        f.id === facility.id ? { ...f, available: true } : f
      )
    );
  };

  const handleDeleteFacility = (id: number) => {
    setFacilities(facilities.filter((facility) => facility.id !== id));
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

  // Pagination logic
  const itemsPerPage = 5; // You can adjust this value as needed
  const totalPages = Math.ceil(facilities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFacilities = facilities.slice(startIndex, endIndex);

  return (
    <div className="container-fluid">
      <h2 className="header-text">Facilities</h2>
      <div className="pe-2 d-flex justify-content-end mb-3">
        <Button onClick={() => handleShowModal()}>Add Facility</Button>
      </div>
      <div className="d-flex justify-content-center">
        <Table striped bordered hover className="mx-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Available</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFacilities.map((facility) => (
              <tr key={facility.id}>
                <td>{facility.id}</td>
                <td>{facility.name}</td>
                <td>{facility.location}</td>
                <td>{facility.available ? "Yes" : "Occupied"}</td>
                <td>
                  {facility.image && (
                    <img src={facility.image} alt="Facility" width="100" />
                  )}
                </td>
                <td>
                  <Button className="mx-2"
                    variant="warning"
                    onClick={() => handleShowModal(facility)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteFacility(facility.id)}
                  >
                    Delete
                  </Button>
                  {!facility.available && (
                    <Button
                      variant="success"
                      onClick={() => handleMakeAvailable(facility)}
                    >
                      Make Available
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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
          <Modal.Title>
            {currentFacility.id ? "Edit Facility" : "Add Facility"}
          </Modal.Title>
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
