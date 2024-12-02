import React from "react";
import "./DebugUserProfile.css"; // Import the CSS file

const DebugUserProfile: React.FC<{ user: any }> = ({ user }) => {
  console.log("Debug User Profile:", user);
  return (
    <div className="debug-user-profile">
      <h2>Debug User Profile</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default DebugUserProfile;
