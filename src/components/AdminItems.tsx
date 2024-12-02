import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { Item } from "../types";
import "./Dashboard.css";

interface AdminItemsProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const AdminItems: React.FC<AdminItemsProps> = ({ items, setItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<Item>>({});

  const categoryOptions = ["Printer", "Mouse", "Projector"]; // Define your category options here
  const brandOptions = ["HP", "Logitech", "Epson"]; // Define your brand options here

  const handleShowModal = (item?: Item) => {
    setCurrentItem(item || {});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveItem = () => {
    if (currentItem.id) {
      setItems(
        items.map((item) =>
          item.id === currentItem.id ? (currentItem as Item) : item
        )
      );
    } else {
      setItems([
        ...items,
        { ...currentItem, id: items.length + 1, available: true } as Item,
      ]);
    }
    handleCloseModal();
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2 className="header-text">Manage Items</h2>
      <Button onClick={() => handleShowModal()}>Add Item</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Quantity</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.category}</td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.quantity}</td>
              <td>{item.available ? "Yes" : "No"}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(item)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem.id ? "Edit Item" : "Add Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={currentItem.category || ""}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Select
                value={currentItem.brand || ""}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, brand: e.target.value })
                }
              >
                <option value="">Select Brand</option>
                {brandOptions.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                value={currentItem.model || ""}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, model: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={currentItem.quantity || 0}
                onChange={(e) =>
                  setCurrentItem({
                    ...currentItem,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminItems;
