import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "./Global.css"; // Import global styles

// Define the interfaces
interface Borrowing {
  id: number;
  borrower: string;
  item: string;
  dateBorrowed: string;
  returnDate: string;
  status: string;
}

interface ReturnedItem {
  id: number;
  item: string;
  dateReturned: string;
}

// Sample data for borrowings and returned items
const borrowings: Borrowing[] = [
  {
    id: 1,
    borrower: "Kevin Cris",
    item: "Laptop",
    dateBorrowed: "2022-01-01",
    returnDate: "2022-01-15",
    status: "Borrowed",
  },
  {
    id: 2,
    borrower: "Shienae",
    item: "Projector",
    dateBorrowed: "2022-02-01",
    returnDate: "2022-02-15",
    status: "Returned",
  },
  {
    id: 3,
    borrower: "Rose Ann",
    item: "Monitor",
    dateBorrowed: "2022-02-01",
    returnDate: "2022-02-15",
    status: "Borrowed",
  },
  // Additional items...
];

const returnedItems: ReturnedItem[] = [
  { id: 1, item: "Laptop", dateReturned: "2022-01-15" },
  { id: 2, item: "Projector", dateReturned: "2022-02-15" },
  // Additional items...
];

const Borrow: React.FC = () => {
  return (
    <Container className="page-container">
      {/* Borrowings Table */}
      <Row>
        <Col md={12} className="content-card">
          <h1 className="page-title">Borrowings</h1>
          <Table bordered hover responsive className="facility-table">
            <thead>
              <tr>
                <th>Borrower</th>
                <th>Item</th>
                <th>Date Borrowed</th>
                <th>Return Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {borrowings.map((borrowing) => (
                <tr
                  key={borrowing.id}
                  className={
                    borrowing.status === "Returned"
                      ? "returned-row"
                      : "borrowed-row"
                  }
                >
                  <td>{borrowing.borrower}</td>
                  <td>{borrowing.item}</td>
                  <td>{borrowing.dateBorrowed}</td>
                  <td>{borrowing.returnDate}</td>
                  <td>{borrowing.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Returned Items Table */}
      <Row>
        <Col md={12} className="content-card">
          <h1 className="page-title">Returned Items</h1>
          <Table bordered hover responsive className="facility-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Date Returned</th>
              </tr>
            </thead>
            <tbody>
              {returnedItems.map((item) => (
                <tr key={item.id} className="returned-row">
                  <td>{item.item}</td>
                  <td>{item.dateReturned}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Borrow;
