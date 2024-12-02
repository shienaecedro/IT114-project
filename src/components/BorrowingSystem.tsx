import React, { useState } from "react";
import { ListGroup, Modal, Button } from "react-bootstrap";

interface Item {
  name: string;
  available: number;
}

interface Inventory {
  [category: string]: Item[];
}

const BorrowingSystem: React.FC = () => {
  // Sample inventory with categories and availability counts
  const inventory: Inventory = {
    "Input Devices": [
      { name: "Keyboard", available: 10 },
      { name: "Mouse", available: 15 },
    ],
    "Display Devices": [
      { name: "Monitor", available: 5 },
      { name: "Projector", available: 2 },
    ],
    "Audio Devices": [{ name: "Speaker", available: 8 }],
  };

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Function to handle the item click
  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setShow(true);
  };

  // Close the modal
  const handleClose = () => setShow(false);

  return (
    <div className="container mt-4">
      <h2>Item Borrowing System</h2>
      {Object.keys(inventory).map((category, index) => (
        <div key={index} className="mb-3">
          <h4>{category}</h4>
          <ListGroup>
            {inventory[category].map((item, idx) => (
              <ListGroup.Item
                key={idx}
                action
                onClick={() => handleItemClick(item)}
              >
                {item.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ))}

      {/* Modal to show item availability */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Item Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem ? (
            <p>
              <strong>{selectedItem.name}</strong> - Available:{" "}
              {selectedItem.available}
            </p>
          ) : (
            <p>Select an item to view its availability.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BorrowingSystem;
