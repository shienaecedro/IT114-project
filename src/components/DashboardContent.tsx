// DashboardContent.tsx
import React from "react";
import { Card, Table, Row, Col } from "react-bootstrap";

const DashboardContent: React.FC = () => {
  return (
    <div className="p-3">
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Recently Added Item</Card.Header>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Model</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Projector</td>
                  <td>ViewSonic LS550WHE 3000</td>
                  <td>2 pcs</td>
                  <td>09/24/24</td>
                  <td className="text-success">Available</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Statistics</Card.Header>
            <Card.Body>
              <p>Weekly Comparison</p>
              {/* Replace with a chart component */}
              <div className="border bg-light text-center py-5">
                Chart Placeholder
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Recent Transaction</Card.Header>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Keyboard</td>
                  <td>2 pcs</td>
                  <td className="text-primary">Borrowed</td>
                </tr>
                <tr>
                  <td>Mouse</td>
                  <td>2 pcs</td>
                  <td className="text-danger">Due</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Recent Borrowed Item</Card.Header>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Model</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Borrower</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Keyboard</td>
                  <td>K-1000 78 Keys</td>
                  <td>2 pcs</td>
                  <td>09/20/24</td>
                  <td>You</td>
                </tr>
                <tr>
                  <td>Mouse</td>
                  <td>Logitech M170/M171</td>
                  <td>2 pcs</td>
                  <td>09/16/24</td>
                  <td>Jane</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
