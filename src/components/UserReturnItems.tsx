import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Item, Transaction } from "../types";
import "./Dashboard.css";

interface UserReturnItemsProps {
  items: Item[];
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  currentUser: string; // Add currentUser prop
}

const UserReturnItems: React.FC<UserReturnItemsProps> = ({
  items,
  transactions,
  setTransactions,
  setItems,
  currentUser, // Use currentUser prop
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const handleShowModal = (item: Item) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleReturnItem = () => {
    if (currentItem) {
      setItems(
        items.map((item) =>
          item.id === currentItem.id ? { ...item, available: true } : item
        )
      );
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        user: currentUser, // Use currentUser
        item: {
          category: currentItem.category,
          brand: currentItem.brand,
          model: currentItem.model,
        },
        type: "return",
        date: new Date().toISOString().split("T")[0],
      };
      saveTransaction(newTransaction);
      handleCloseModal();
    }
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
      <h2 className="mt-3 header-text">Return Items</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((item) => !item.available) // Only show unavailable (borrowed) items
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.available ? "Yes" : "No"}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleShowModal(item)}
                  >
                    Return
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Return Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to return {currentItem?.brand}{" "}
            {currentItem?.model}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReturnItem}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserReturnItems;
