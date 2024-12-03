import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Nav } from "react-bootstrap";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminItems from "./components/AdminItems";
import AdminFacilities from "./components/AdminFacilities";
import AdminUsers from "./components/AdminUsers";
import UserBorrowItems from "./components/UserBorrowItems";
import UserBookFacilities from "./components/UserBookFacilities";
import UserTransactions from "./components/UserTransactions";
import AdminTransactions from "./components/AdminTransactions";
import UserReturnItems from "./components/UserReturnItems";
import DashboardHeader from "./components/DashboardHeader"; // Import the new DashboardHeader component
import SearchResults from "./components/SearchResults"; // Import SearchResults component
import UserDashboard from "./components/UserDashboard"; // Import UserDashboard component
import AdminDashboard from "./components/AdminDashboard"; // Import AdminDashboard component
import UserProfile from "./components/UserProfile"; // Import UserProfile component
import { Item, Facility, Transaction } from "./types"; // Import interfaces from types file
import "./App.css";

const Sidebar: React.FC<{ role: string; onLogout: () => void }> = ({
  role,
  onLogout,
}) => {
  return (
    <div className="sidebar d-flex flex-column bg-dark text-light vh-100">
      <Nav className="flex-column mt-5">
        <Nav.Item>
          <Nav.Link as={Link} to="/dashboard" className="text-light">
            Dashboard
          </Nav.Link>
        </Nav.Item>
        {role === "admin" && (
          <>
            <Nav.Item>
              <Nav.Link as={Link} to="/admin/items" className="text-light">
                Items
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/admin/facilities" className="text-light">
                Facilities
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/admin/transactions"
                className="text-light"
              >
                Transactions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/profile" className="text-light">
                Profile
              </Nav.Link>
            </Nav.Item>
          </>
        )}
        {role === "user" && (
          <>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/user/borrow-items"
                className="text-light"
              >
                Borrow Items
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/user/book-facilities"
                className="text-light"
              >
                Book Facility
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/user/return-items"
                className="text-light"
              >
                Returns
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/user/transactions"
                className="text-light"
              >
                Transactions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/profile" className="text-light">
                Profile
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
      <Nav className="mt-auto mb-3">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/login"
            className="text-light"
            onClick={onLogout}
          >
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [users, setUsers] = useState<
    { username: string; password: string; role: string }[]
  >([]);
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [facilities, setFacilities] = useState<Facility[]>(() => {
    const savedFacilities = localStorage.getItem("facilities");
    return savedFacilities ? JSON.parse(savedFacilities) : [];
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentUserDetails, setCurrentUserDetails] = useState<any>({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    dateOfBirth: "",
    profilePicture: "",
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("facilities", JSON.stringify(facilities));
  }, [items, facilities]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    // Create an admin account if it doesn't exist
    const adminUser = {
      username: "admin",
      password: "admin123",
      role: "admin",
      profilePicture: "",
      joinDate: new Date().toISOString().split("T")[0],
    };
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
    if (
      !parsedUsers.some(
        (user: { username: string }) => user.username === adminUser.username
      )
    ) {
      parsedUsers.push(adminUser);
      localStorage.setItem("users", JSON.stringify(parsedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users)); // Synchronize users list
  }, [users]);

  const handleLogin = (username: string, userRole: string) => {
    setIsLoggedIn(true);
    setRole(userRole);
    setCurrentUser(username); // Set the current user
    const userDetails = users.find((user) => user.username === username); // Fetch user details
    if (userDetails) {
      setCurrentUserDetails({
        ...userDetails,
        profilePicture: "", // Initialize with empty profile picture
      });
    }
    console.log("User Details on Login:", currentUserDetails);
  };

  const handleRegister = (newUsername: string, newPassword: string) => {
    const newUser = {
      username: newUsername,
      password: newPassword,
      role: "user", // Automatically assign "user" role
      profilePicture: "",
    };
    setUsers([...users, newUser]);
    alert("Registered successfully!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setCurrentUser(null); // Clear the current user
    setCurrentUserDetails(null); // Clear user details
  };

  const updateUserDetails = (updatedUser: any) => {
    setCurrentUserDetails(updatedUser);
    setUsers(
      users.map((user) =>
        user.username === updatedUser.username ? updatedUser : user
      )
    );
  };

  return (
    <Router>
      <div className="d-flex">
        {isLoggedIn && role && <Sidebar role={role} onLogout={handleLogout} />}
        <div className="flex-grow-1">
          <Routes>
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} items={items} />}
            />
            <Route
              path="/register"
              element={<Register onRegister={handleRegister} />}
            />
            {isLoggedIn && role === "admin" && (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <AdminDashboard
                      username={currentUser ?? "N/A"}
                      transactions={transactions}
                      items={items}
                      facilities={facilities}
                    />
                  }
                />
                <Route
                  path="/admin/items"
                  element={<AdminItems items={items} setItems={setItems} />}
                />
                <Route
                  path="/admin/facilities"
                  element={
                    <AdminFacilities
                      facilities={facilities}
                      setFacilities={setFacilities}
                    />
                  }
                />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route
                  path="/admin/transactions"
                  element={<AdminTransactions transactions={transactions} />}
                />
                <Route
                  path="/profile"
                  element={
                    <>
                      {console.log(
                        "Rendering Profile with User Details:",
                        currentUserDetails
                      )}
                      <UserProfile
                        user={currentUserDetails}
                        updateUser={updateUserDetails}
                      />
                    </>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </>
            )}
            {isLoggedIn && role === "user" && (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <UserDashboard
                      username={currentUser ?? "N/A"}
                      transactions={transactions}
                      items={items}
                    />
                  }
                />
                <Route
                  path="/user/borrow-items"
                  element={
                    <UserBorrowItems
                      items={items}
                      setItems={setItems}
                      transactions={transactions}
                      setTransactions={setTransactions}
                      currentUser={currentUser ?? "N/A"} // Pass currentUser
                    />
                  }
                />
                <Route
                  path="/user/book-facilities"
                  element={
                    <UserBookFacilities
                      facilities={facilities}
                      setFacilities={setFacilities}
                      transactions={transactions}
                      setTransactions={setTransactions}
                      currentUser={currentUser ?? "N/A"} // Pass currentUser
                    />
                  }
                />
                <Route
                  path="/user/return-items"
                  element={
                    <UserReturnItems
                      items={items}
                      setItems={setItems}
                      transactions={transactions}
                      setTransactions={setTransactions}
                      currentUser={currentUser ?? "N/A"} // Pass currentUser
                    />
                  }
                />
                <Route
                  path="/user/transactions"
                  element={
                    <UserTransactions
                      transactions={transactions.filter(
                        (t) => t.user === currentUser
                      )}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <>
                      {console.log(
                        "Rendering Profile with User Details:",
                        currentUserDetails
                      )}
                      <UserProfile
                        user={currentUserDetails}
                        updateUser={updateUserDetails}
                      />
                    </>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </>
            )}
            {/* Add search route */}
            <Route path="/search" element={<SearchResults />} />
            {!isLoggedIn && (
              <Route path="/" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};



export default App;
