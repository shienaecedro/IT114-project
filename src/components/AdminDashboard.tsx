import React from "react";
import { Item, Facility, Transaction } from "../types"; // Import interfaces from types file
import AdminTransactions from "./AdminTransactions"; // Import the AdminTransactions component
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
    <div id="layoutSidenav_content" className="bg-white">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body">Available Items</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <span>{availableItemsCount}</span>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">Available Facilities</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <span>{availableFacilitiesCount}</span>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-success text-white mb-4">
                <div className="card-body">Total Transactions</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <span>{totalTransactions}</span>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* Integrate the AdminTransactions component */}
          <AdminTransactions transactions={transactions} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
