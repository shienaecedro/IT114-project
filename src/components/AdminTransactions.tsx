import React, { useState, useEffect } from "react";
import { Table, Form, Row, Col, Pagination } from "react-bootstrap";
import { Transaction } from "../types"; // Import interface from types file
import "./Dashboard.css";

interface AdminTransactionsProps {
  transactions: Transaction[];
}

const AdminTransactions: React.FC<AdminTransactionsProps> = ({
  transactions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // Default to empty string to show all statuses
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [uniqueTransactions, setUniqueTransactions] = useState<Transaction[]>([]);

  // Function to generate unique IDs
  const generateUniqueId = (() => {
    let id = 0;
    return () => ++id;
  })();

  useEffect(() => {
    const itemTransactionMap: { [key: string]: number } = {};

    // Assign unique IDs to each transaction and ensure borrowed and returned items match
    const transactionsWithUniqueIds = transactions.map((transaction) => {
      if (transaction.type === "borrow") {
        const uniqueId = generateUniqueId();
        itemTransactionMap[transaction.item.id] = uniqueId;
        return {
          ...transaction,
          id: uniqueId,
        };
      } else if (transaction.type === "return") {
        const uniqueId = itemTransactionMap[transaction.item.id] || generateUniqueId();
        return {
          ...transaction,
          id: uniqueId,
        };
      }
      return transaction;
    });

    setUniqueTransactions(transactionsWithUniqueIds);
  }, [transactions]);

  // Get unique categories from transactions
  const uniqueCategories = Array.from(
    new Set(transactions.map((transaction) => transaction.item.category))
  );

  // Filter transactions based on the selected filters
  const filteredTransactions = uniqueTransactions.filter((transaction) => {
    const matchesCategory = selectedCategory
      ? transaction.item.category === selectedCategory
      : true;
    const matchesStatus = selectedStatus ? transaction.type === selectedStatus : true;
    const matchesDate = selectedDate
      ? new Date(transaction.date).toISOString().slice(0, 10) === selectedDate
      : true;
    return matchesCategory && matchesStatus && matchesDate;
  });

  // Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Format date function
  const formatDate = (dateString: string, format: "short" | "long" = "short") => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: format === "short" ? "short" : "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };

  return (
    <div className="mt-4">
      <h2 className="header-text">Transactions</h2>
      <Row className="justify-content-end mb-3">
        Filter by:
        <Col md="auto">
          <Form.Group controlId="selectCategory" className="mb-0">
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md="auto">
          <Form.Group controlId="selectStatus" className="mb-0">
            <Form.Control
              as="select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="borrow">Borrowed</option>
              <option value="return">Returned</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md="auto">
          <Form.Group controlId="selectDate" className="mb-0">
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Status</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
              <td>{transaction.user}</td>
              <td>{transaction.item.category}</td>
              <td>{transaction.item.brand}</td>
              <td>{transaction.item.model}</td>
              <td>{transaction.type === "borrow" ? "Borrowed" : "Returned"}</td>
              <td>{formatDate(transaction.date, "short")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default AdminTransactions;
