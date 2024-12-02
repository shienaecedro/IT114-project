import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Item } from "../types"; // Import interfaces from types file

const Chatbot: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const checkAvailability = (category: string) => {
    const item = items.find(
      (item) =>
        item.category.toLowerCase() === category.toLowerCase() && item.available
    );
    return item ? "Yes, available" : "No, not available";
  };

  return (
    <Card className="p-3">
      <h3>Chatbot</h3>
      <div className="mb-2">
        <p>Is there available Printers to Borrow?</p>
        <Button onClick={() => alert(checkAvailability("Printer"))}>
          Check
        </Button>
      </div>
      <div className="mb-2">
        <p>Is there available Mouse to Borrow?</p>
        <Button onClick={() => alert(checkAvailability("Mouse"))}>Check</Button>
      </div>
      <div className="mb-2">
        <p>Is there available Projectors to Borrow?</p>
        <Button onClick={() => alert(checkAvailability("Projector"))}>
          Check
        </Button>
      </div>
    </Card>
  );
};

export default Chatbot;
