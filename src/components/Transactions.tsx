import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import "./Global.css"; // Import global styles

interface ItemDetails {
  category: string;
  brand: string;
  model: string;
}

interface Transaction {
  id: number;
  item: ItemDetails;
  date: string;
  status: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Filter logic
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (selectedCategory === "" || transaction.item.category === selectedCategory) &&
      (selectedBrand === "" || transaction.item.brand === selectedBrand)
    );
  });

  // Get unique categories and brands for the filter options
  const uniqueCategories = Array.from(new Set(transactions.map((transaction) => transaction.item.category)));
  const uniqueBrands = Array.from(new Set(transactions.map((transaction) => transaction.item.brand)));

  return (
    <Container className="transaction-table page-container mx-2">
      <Row className="mb-3 justify-content-end">
        <Col md="auto">
          <Form.Group controlId="categoryFilter">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="auto">
          <Form.Group controlId="brandFilter">
            <Form.Label>Filter by Brand</Form.Label>
            <Form.Select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {uniqueBrands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={10} className="content-card">
          <h1 className="page-title">Transactions</h1>
          <div className="table-responsive">
            <Table bordered hover className="transaction-table mx-2">
              <thead>
                <tr>
                  <th>Item Category</th>
                  <th>Item Brand</th>
                  <th>Item Model</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.item.category}</td>
                    <td>{transaction.item.brand}</td>
                    <td>{transaction.item.model}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Transactions;
