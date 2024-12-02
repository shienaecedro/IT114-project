import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaComments } from "react-icons/fa";
import Chatbot from "./Chatbot";
import { Item } from "../types";
import "./ChatIcon.css";

interface ChatIconProps {
  items: Item[];
}

const ChatIcon: React.FC<ChatIconProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button className="chat-icon" onClick={toggleChat}>
        <FaComments />
      </Button>
      {isOpen && (
        <div className="chatbot-container">
          <Chatbot items={items} />
        </div>
      )}
    </div>
  );
};

export default ChatIcon;
