import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import "./Global.css";

interface Item {
  id: number;
  type: string;
  name: string;
  brand: string;
  model: string;
  color: string;
  available: boolean;
}

const Items: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      type: "Mouse",
      name: "Mouse 1",
      brand: "Brand A",
      model: "Model X",
      color: "Black",
      available: true,
    },
    {
      id: 2,
      type: "Mouse",
      name: "Mouse 2",
      brand: "Brand A",
      model: "Model Y",
      color: "White",
      available: true,
    },
    {
      id: 3,
      type: "Mouse",
      name: "Mouse 3",
      brand: "Brand A",
      model: "Model Z",
      color: "Gray",
      available: false,
    },
    {
      id: 4,
      type: "Mouse",
      name: "Mouse 4",
      brand: "Brand A",
      model: "Model W",
      color: "Red",
      available: true,
    },
    {
      id: 5,
      type: "Mouse",
      name: "Mouse 5",
      brand: "Brand A",
      model: "Model V",
      color: "Blue",
      available: false,
    },
    {
      id: 6,
      type: "Keyboard",
      name: "Keyboard 1",
      brand: "Brand B",
      model: "Model X",
      color: "Black",
      available: false,
    },
    {
      id: 7,
      type: "Keyboard",
      name: "Keyboard 2",
      brand: "Brand B",
      model: "Model Y",
      color: "White",
      available: true,
    },
    {
      id: 8,
      type: "Keyboard",
      name: "Keyboard 3",
      brand: "Brand B",
      model: "Model Z",
      color: "Silver",
      available: false,
    },
    {
      id: 9,
      type: "Keyboard",
      name: "Keyboard 4",
      brand: "Brand B",
      model: "Model W",
      color: "Gray",
      available: true,
    },
    {
      id: 10,
      type: "Keyboard",
      name: "Keyboard 5",
      brand: "Brand B",
      model: "Model V",
      color: "Blue",
      available: true,
    },
    {
      id: 11,
      type: "Laptop",
      name: "Laptop 1",
      brand: "Brand C",
      model: "Model X",
      color: "Silver",
      available: true,
    },
    {
      id: 12,
      type: "Laptop",
      name: "Laptop 2",
      brand: "Brand C",
      model: "Model Y",
      color: "Black",
      available: false,
    },
    {
      id: 13,
      type: "Laptop",
      name: "Laptop 3",
      brand: "Brand C",
      model: "Model Z",
      color: "White",
      available: true,
    },
    {
      id: 14,
      type: "Laptop",
      name: "Laptop 4",
      brand: "Brand C",
      model: "Model W",
      color: "Gray",
      available: false,
    },
    {
      id: 15,
      type: "Laptop",
      name: "Laptop 5",
      brand: "Brand C",
      model: "Model V",
      color: "Blue",
      available: true,
    },
    {
      id: 16,
      type: "Monitor",
      name: "Monitor 1",
      brand: "Brand D",
      model: "Model X",
      color: "Black",
      available: true,
    },
    {
      id: 17,
      type: "Monitor",
      name: "Monitor 2",
      brand: "Brand D",
      model: "Model Y",
      color: "White",
      available: true,
    },
    {
      id: 18,
      type: "Monitor",
      name: "Monitor 3",
      brand: "Brand D",
      model: "Model Z",
      color: "Silver",
      available: false,
    },
    {
      id: 19,
      type: "Monitor",
      name: "Monitor 4",
      brand: "Brand D",
      model: "Model W",
      color: "Red",
      available: true,
    },
    {
      id: 20,
      type: "Monitor",
      name: "Monitor 5",
      brand: "Brand D",
      model: "Model V",
      color: "Gray",
      available: false,
    },
    {
      id: 21,
      type: "Speaker",
      name: "Speaker 1",
      brand: "Brand E",
      model: "Model X",
      color: "Red",
      available: true,
    },
    {
      id: 22,
      type: "Speaker",
      name: "Speaker 2",
      brand: "Brand E",
      model: "Model Y",
      color: "Black",
      available: false,
    },
    {
      id: 23,
      type: "Speaker",
      name: "Speaker 3",
      brand: "Brand E",
      model: "Model Z",
      color: "White",
      available: true,
    },
    {
      id: 24,
      type: "Speaker",
      name: "Speaker 4",
      brand: "Brand E",
      model: "Model W",
      color: "Gray",
      available: true,
    },
    {
      id: 25,
      type: "Speaker",
      name: "Speaker 5",
      brand: "Brand E",
      model: "Model V",
      color: "Blue",
      available: false,
    },
    {
      id: 26,
      type: "Projector",
      name: "Projector 1",
      brand: "Brand F",
      model: "Model X",
      color: "White",
      available: true,
    },
    {
      id: 27,
      type: "Projector",
      name: "Projector 2",
      brand: "Brand F",
      model: "Model Y",
      color: "Black",
      available: false,
    },
    {
      id: 28,
      type: "Projector",
      name: "Projector 3",
      brand: "Brand F",
      model: "Model Z",
      color: "Gray",
      available: true,
    },
    {
      id: 29,
      type: "Projector",
      name: "Projector 4",
      brand: "Brand F",
      model: "Model W",
      color: "Silver",
      available: true,
    },
    {
      id: 30,
      type: "Projector",
      name: "Projector 5",
      brand: "Brand F",
      model: "Model V",
      color: "Red",
      available: false,
    },
    {
      id: 31,
      type: "Scanner",
      name: "Scanner 1",
      brand: "Brand G",
      model: "Model X",
      color: "Black",
      available: true,
    },
    {
      id: 32,
      type: "Scanner",
      name: "Scanner 2",
      brand: "Brand G",
      model: "Model Y",
      color: "White",
      available: false,
    },
    {
      id: 33,
      type: "Scanner",
      name: "Scanner 3",
      brand: "Brand G",
      model: "Model Z",
      color: "Gray",
      available: true,
    },
    {
      id: 34,
      type: "Scanner",
      name: "Scanner 4",
      brand: "Brand G",
      model: "Model W",
      color: "Silver",
      available: true,
    },
    {
      id: 35,
      type: "Scanner",
      name: "Scanner 5",
      brand: "Brand G",
      model: "Model V",
      color: "Red",
      available: false,
    },
    {
      id: 36,
      type: "Tablet",
      name: "Tablet 1",
      brand: "Brand H",
      model: "Model X",
      color: "Gold",
      available: true,
    },
    {
      id: 37,
      type: "Tablet",
      name: "Tablet 2",
      brand: "Brand H",
      model: "Model Y",
      color: "Black",
      available: false,
    },
    {
      id: 38,
      type: "Tablet",
      name: "Tablet 3",
      brand: "Brand H",
      model: "Model Z",
      color: "Silver",
      available: true,
    },
    {
      id: 39,
      type: "Tablet",
      name: "Tablet 4",
      brand: "Brand H",
      model: "Model W",
      color: "White",
      available: false,
    },
    {
      id: 40,
      type: "Tablet",
      name: "Tablet 5",
      brand: "Brand H",
      model: "Model V",
      color: "Blue",
      available: true,
    },
    {
      id: 41,
      type: "Printer",
      name: "Printer 1",
      brand: "Brand I",
      model: "Model X",
      color: "White",
      available: true,
    },
    {
      id: 42,
      type: "Printer",
      name: "Printer 2",
      brand: "Brand I",
      model: "Model Y",
      color: "Black",
      available: false,
    },
    {
      id: 43,
      type: "Printer",
      name: "Printer 3",
      brand: "Brand I",
      model: "Model Z",
      color: "Gray",
      available: true,
    },
    {
      id: 44,
      type: "Printer",
      name: "Printer 4",
      brand: "Brand I",
      model: "Model W",
      color: "Red",
      available: false,
    },
    {
      id: 45,
      type: "Printer",
      name: "Printer 5",
      brand: "Brand I",
      model: "Model V",
      color: "Blue",
      available: true,
    },
    {
      id: 46,
      type: "Headphones",
      name: "Headphones 1",
      brand: "Brand J",
      model: "Model X",
      color: "Black",
      available: true,
    },
    {
      id: 47,
      type: "Headphones",
      name: "Headphones 2",
      brand: "Brand J",
      model: "Model Y",
      color: "White",
      available: false,
    },
    {
      id: 48,
      type: "Headphones",
      name: "Headphones 3",
      brand: "Brand J",
      model: "Model Z",
      color: "Gray",
      available: true,
    },
    {
      id: 49,
      type: "Headphones",
      name: "Headphones 4",
      brand: "Brand J",
      model: "Model W",
      color: "Red",
      available: true,
    },
    {
      id: 50,
      type: "Headphones",
      name: "Headphones 5",
      brand: "Brand J",
      model: "Model V",
      color: "Blue",
      available: false,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [userName, setUserName] = useState("");
  const [borrowDate, setBorrowDate] = useState("");

  const handleShowModal = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleBorrow = () => {
    if (selectedItem) {
      setItems(
        items.map((item) =>
          item.id === selectedItem.id ? { ...item, available: false } : item
        )
      );
      alert(
        `Item ${selectedItem.name} borrowed successfully by ${userName} on ${borrowDate}`
      );
      handleCloseModal();
    }
  };

  const categorizedItems = items.reduce<{ [key: string]: Item[] }>(
    (acc, item) => {
      acc[item.type] = acc[item.type] || [];
      acc[item.type].push(item);
      return acc;
    },
    {}
  );

  return (
    <Container className="page-container">
      <Row>
        <Col md={12} className="content-card">
          <h1 className="page-title">Items</h1>
          <Dropdown
            onSelect={(eventKey) => setSelectedCategory(eventKey || null)}
          >
            <Dropdown.Toggle
              variant="light"
              className="custom-dropdown-toggle"
              style={{
                border: "2px solid orange",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              {selectedCategory || "Select Category"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(categorizedItems).map((type) => (
                <Dropdown.Item
                  key={type}
                  eventKey={type}
                  style={{ color: "orange", fontWeight: "bold" }}
                >
                  {type}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {selectedCategory && (
            <div className="mt-4">
              <h2>{selectedCategory}</h2>
              <Table
                bordered
                hover
                responsive
                className="item-table wider-table"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Available</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categorizedItems[selectedCategory].map((item) => (
                    <tr
                      key={item.id}
                      className={
                        item.available ? "available-row" : "occupied-row"
                      }
                    >
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.model}</td>
                      <td>{item.color}</td>
                      <td>{item.available ? "Yes" : "No"}</td>
                      <td>
                        {item.available && (
                          <Button
                            variant="warning"
                            onClick={() => handleShowModal(item)}
                          >
                            Borrow
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>

      {/* Borrowing Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Borrow Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              <Form.Group controlId="formUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBorrowDate">
                <Form.Label>Borrow Date</Form.Label>
                <Form.Control
                  type="date"
                  value={borrowDate}
                  onChange={(e) => setBorrowDate(e.target.value)}
                />
              </Form.Group>
              <Button variant="warning" onClick={handleBorrow}>
                Borrow
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Items;
