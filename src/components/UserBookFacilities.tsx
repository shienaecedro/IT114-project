import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Facility, Transaction } from "../types"; // Import interfaces from types file

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
    <div>
      <h2>Book Facilities</h2>
      <Table striped bordered hover>
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
          {facilities.map((facility) => (
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
                {facility.available ? (
                  <Button
                    variant="success"
                    onClick={() => handleShowModal(facility)}
                  >
                    Book
                  </Button>
                ) : (
                  <>
                    <Button variant="secondary" disabled>
                      Occupied
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleReleaseFacility(facility)}
                    >
                      Release
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
