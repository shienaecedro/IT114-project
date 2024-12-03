import React from "react";
import { Table } from "react-bootstrap";
import { Transaction } from "../types"; // Import interface from types file
import "./Dashboard.css";

interface UserTransactionsProps {
  transactions: Transaction[];
}

const UserTransactions: React.FC<UserTransactionsProps> = ({
  transactions,
}) => {
  console.log("Transactions data: ", transactions); // Add this line for debugging

  if (transactions.length === 0) {
    return <p className="no-transactions">No transactions found.</p>; // Display message if no transactions
  }

  return (
    <div>
      <h2 className="header-text">Transaction History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Category</th>
            <th>Item Brand</th>
            <th>Item Model</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
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

export default UserTransactions;
