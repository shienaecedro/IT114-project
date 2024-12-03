import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Transaction, Item } from "../types";
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
  // Get the latest transaction for each item and check if it's a borrow
  const borrowedItems = items.filter(item => {
    const itemTransactions = transactions.filter(transaction => transaction.item.category === item.category && transaction.item.brand === item.brand && transaction.item.model === item.model);
    const latestTransaction = itemTransactions.reduce((latest, transaction) => transaction.date > latest.date ? transaction : latest, itemTransactions[0]);
    return latestTransaction && latestTransaction.type !== "return";
  });

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className=" mt-3 header-text">Dashboard</h1>
        </Col>
      </Row>

      {/* Display borrowed items or "No Current Borrows" message */}
      <Row className="mt-4">
        {borrowedItems.length === 0 ? (
          <Col className="text-center">
            <h2 className="no-borrows-text">No Current Borrows</h2>
          </Col>
        ) : (
          borrowedItems.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card className="small-card">
                {item.image && <Card.Img variant="top" src={item.image} />}
                <Card.Body>
                  <Card.Title>{`${item.brand} ${item.model}`}</Card.Title>
                  <Card.Text>
                    <Badge bg="secondary" className="me-2">
                      {item.category}
                    </Badge>
                    <div className="mt-2">
                      <span className="badge bg-primary">Status: Borrowed</span>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default UserDashboard;
