import React, { useState } from "react";
import { Card, Button, Modal, Row, Col, Badge, Pagination } from "react-bootstrap";
import { Facility, Transaction } from "../types";
import "./Dashboard.css";

interface UserBookFacilitiesProps {
  facilities: Facility[];
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>;
  currentUser: string; // Add currentUser prop
}

const UserBookFacilities: React.FC<UserBookFacilitiesProps> = ({
  facilities,
  transactions,
  setTransactions,
  setFacilities,
  currentUser, // Use currentUser prop
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentFacility, setCurrentFacility] = useState<Facility | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const facilitiesPerPage = 9;
  const totalPages = Math.ceil(facilities.length / facilitiesPerPage);
  const startIndex = (currentPage - 1) * facilitiesPerPage;
  const endIndex = startIndex + facilitiesPerPage;
  const paginatedFacilities = facilities.slice(startIndex, endIndex);

  const handleShowModal = (facility: Facility) => {
    setCurrentFacility(facility);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookFacility = () => {
    if (currentFacility) {
      setFacilities(
        facilities.map((facility) =>
          facility.id === currentFacility.id
            ? { ...facility, available: false }
            : facility
        )
      );
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        user: currentUser, // Use currentUser
        item: {
          category: "Facility", // Assuming all facilities are categorized under "Facility"
          brand: currentFacility.name,
          model: currentFacility.location,
        },
        type: "book",
        date: new Date().toISOString().split("T")[0],
      };
      saveTransaction(newTransaction);
      handleCloseModal();
    }
  };

  const handleReleaseFacility = (facility: Facility) => {
    setFacilities(
      facilities.map((f) =>
        f.id === facility.id ? { ...f, available: true } : f
      )
    );
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      user: currentUser, // Use currentUser
      item: {
        category: "Facility", // Assuming all facilities are categorized under "Facility"
        brand: facility.name,
        model: facility.location,
      },
      type: "return",
      date: new Date().toISOString().split("T")[0],
    };
    saveTransaction(newTransaction);
  };

  const saveTransaction = (transaction: Transaction) => {
    const savedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    savedTransactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(savedTransactions));
    setTransactions(savedTransactions); // Update state with new transactions
  };

  return (
    <div className="container-fluid">
      <h2 className="header-text">Book Facilities</h2>
      <Row>
        {paginatedFacilities.map((facility) => (
          <Col key={facility.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card className="content-card">
              {facility.image && <Card.Img variant="top" src={facility.image} />}
              <Card.Body>
                <Card.Title>{facility.name}</Card.Title>
                <Card.Text>
                  <Badge bg="secondary" className="me-2">
                    {facility.location}
                  </Badge>
                  <Badge bg={facility.available ? "success" : "danger"} className="me-2">
                    {facility.available ? "Available" : "Occupied"}
                  </Badge>
                  <div className="d-flex justify-content-between mt-3">
                    {facility.available ? (
                      <Button
                        variant="success"
                        onClick={() => handleShowModal(facility)}
                      >
                        Book
                      </Button>
                    ) : (
                      <Button variant="danger" onClick={() => handleReleaseFacility(facility)}>
                        Release
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
        <Pagination.First
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to book {currentFacility?.name}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBookFacility}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserBookFacilities;
