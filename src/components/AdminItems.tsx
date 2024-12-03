import React, { useState } from "react";
import { Card, Button, Form, Modal, Pagination, Row, Col, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Import FaPlus icon
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
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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
        { ...currentItem, id: items.length + 1, available: true, borrowed: 0 } as Item,
      ]);
    }
    handleCloseModal();
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentItem({ ...currentItem, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const itemsPerPage = 9;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="container-fluid">
      <h2 className="header-text">Inventory</h2>
      <div className="pe-2 d-flex justify-content-between mb-3">
        <Form.Select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="w-auto"
        >
          <option value="">All Categories</option>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
        <Button onClick={() => handleShowModal()} className="btn-orange"> {/* Apply orange color */}
          <FaPlus className="me-2" /> Add Item
        </Button>
      </div>
      <Row>
        {paginatedItems.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card className="small-card">
              {item.image && <Card.Img variant="top" src={item.image} />}
              <Card.Body>
                <Card.Title>{`${item.brand} ${item.model}`}</Card.Title>
                <Card.Text>
                  <Badge bg="secondary" className="me-2">
                    {item.category}
                  </Badge>
                  <Badge bg="secondary" className="me-2">
                    Quantity: {item.quantity}
                  </Badge>
                  <div className="d-flex justify-content-end mt-3">
                    <Button size="sm" className="btn-orange me-2">
                      <FaEdit className="text-white" onClick={() => handleShowModal(item)} />
                    </Button>
                    <Button size="sm" className="btn-orange">
                      <FaTrash className="text-white" onClick={() => handleDeleteItem(item.id)} />
                    </Button>
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
            <Form.Group>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
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
