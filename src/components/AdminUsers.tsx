import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

interface User {
  id: number;
  username: string;
  role: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User>>({});

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleShowModal = (user?: User) => {
    setCurrentUser(user || {});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveUser = () => {
    if (currentUser.id) {
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? (currentUser as User) : user
        )
      );
    } else {
      setUsers([...users, { ...currentUser, id: users.length + 1 } as User]);
    }
    handleCloseModal();
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <Button onClick={() => handleShowModal()}>Add User</Button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(user)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser.id ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={currentUser.username || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={currentUser.role || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, role: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminUsers;
