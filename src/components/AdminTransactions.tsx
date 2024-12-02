import React from "react";
import { Table } from "react-bootstrap";
import { Transaction } from "../types"; // Import interface from types file
import "./Dashboard.css";

interface AdminTransactionsProps {
  transactions: Transaction[];
}

const AdminTransactions: React.FC<AdminTransactionsProps> = ({
  transactions,
}) => {
  return (
    <div>
      <h2 className="header-text">All Transactions</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
              <td>{transaction.user}</td>
              <td>{transaction.item.category}</td>
              <td>{transaction.item.brand}</td>
              <td>{transaction.item.model}</td>
              <td>
                {transaction.type === "borrow"
                  ? "Borrowed"
                  : transaction.type === "return"
                  ? "Returned"
                  : "Booked"}
              </td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminTransactions;
