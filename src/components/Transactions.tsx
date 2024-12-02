import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
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

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  return (
    <Container className="page-container">
      <Row>
        <Col md={12} className="content-card">
          <h1 className="page-title">Transactions</h1>
          <Table
            bordered
            hover
            responsive
            className="transaction-table wider-table"
          >
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
              {transactions.map((transaction) => (
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
        </Col>
      </Row>
    </Container>
  );
};

export default Transactions;
