import React, { useState } from "react";
import { Card, Button, Modal, Row, Col, Badge, Pagination } from "react-bootstrap";
import { Item, Transaction } from "../types";
import "./Dashboard.css";

interface UserBorrowItemsProps {
  items: Item[];
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  currentUser: string; // Add currentUser prop
}

const UserBorrowItems: React.FC<UserBorrowItemsProps> = ({
  items,
  transactions,
  setTransactions,
  setItems,
  currentUser, // Use currentUser prop
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 9;
  const availableItems = items.filter(item => item.available);
  const totalPages = Math.ceil(availableItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = availableItems.slice(startIndex, endIndex);

  const handleShowModal = (item: Item) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBorrowItem = () => {
    if (currentItem) {
      setItems(
        items.map((item) =>
          item.id === currentItem.id ? { ...item, available: false } : item
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
        type: "borrow",
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
    <div className="container-fluid">
      <h2 className="header-text">Borrow Items</h2>
      <Row>
        {paginatedItems.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card className="content-card">
              {item.image && <Card.Img variant="top" src={item.image} />}
              <Card.Body>
                <Card.Title>{`${item.brand} ${item.model}`}</Card.Title>
                <Card.Text>
                  <Badge bg="secondary" className="me-2">
                    {item.category}
                  </Badge>
                  <Badge bg="success" className="me-2">
                    Available
                  </Badge>
                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="success"
                      onClick={() => handleShowModal(item)}
                    >
                      Borrow
                    </Button>
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
          <Modal.Title>Borrow Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to borrow {currentItem?.brand}{" "}
            {currentItem?.model}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBorrowItem}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserBorrowItems;
