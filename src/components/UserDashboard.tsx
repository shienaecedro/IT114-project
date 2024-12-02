import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Transaction, Item } from "../types"; // Import interfaces from types file
import "./Dashboard.css";

interface UserDashboardProps {
  username: string;
  transactions: Transaction[];
  items: Item[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  username,
  transactions,
  items,
}) => {
  const recentTransactions = transactions.slice(-5);

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
            <Card.Header>Recent Activity</Card.Header>
            <ListGroup variant="flush">
              {recentTransactions.map((transaction, index) => (
                <ListGroup.Item key={index}>
                  {transaction.type === "borrow" ? "Borrowed" : "Booked"}{" "}
                  {transaction.item.brand} {transaction.item.model} on{" "}
                  {transaction.date}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
