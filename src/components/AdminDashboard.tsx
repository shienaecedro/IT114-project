import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Item, Facility, Transaction } from "../types"; // Import interfaces from types file
import "./Dashboard.css";

interface AdminDashboardProps {
  username: string;
  items: Item[];
  facilities: Facility[];
  transactions: Transaction[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  username,
  items,
  facilities,
  transactions,
}) => {
  const availableItemsCount = items.filter((item) => item.available).length;
  const availableFacilitiesCount = facilities.filter(
    (facility) => facility.available
  ).length;
  const totalTransactions = transactions.length;

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="header-text">Welcome, {username}!</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>Statistics and Metrics</Card.Header>
            <Card.Body>
              <p>Available Items: {availableItemsCount}</p>
              <p>Available Facilities: {availableFacilitiesCount}</p>
              <p>Total Transactions: {totalTransactions}</p>
              {/* Add more statistics as needed */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
