import React, { useState } from "react";
import { Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { Item } from "../types";
import "./Dashboard.css";

interface AdminItemsProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const AdminItems: React.FC<AdminItemsProps> = ({ items, setItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<Item>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categoryOptions = ["Printer", "Mouse", "Projector"];
  const brandOptions = ["HP", "Logitech", "Epson"];

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
        { ...currentItem, id: items.length + 1, available: true, borrowed: 0 } as Item, // Initialize borrowed to 0
      ]);
    }
    handleCloseModal();
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const itemsPerPage = 5; // You can adjust this value as needed
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return (
    <div className="container-fluid">
      <h2 className="header-text">Inventory</h2>
      <div className="pe-2 d-flex justify-content-end mb-3">
        <Button onClick={() => handleShowModal()}>Add Item</Button>
      </div>
      <div className="d-flex justify-content-center">
        <Table striped bordered hover className="mx-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button className="mx-2" variant="warning" onClick={() => handleShowModal(item)}>
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
