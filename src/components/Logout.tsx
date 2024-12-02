import React from "react";

interface LogoutProps {
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  return (
    <div>
      <h2>Logout</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Logout;
