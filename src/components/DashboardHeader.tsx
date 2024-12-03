import React, { useState } from "react";
import { Container, FormControl, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./DashboardHeader.css"; // Ensure you have a CSS file for custom styles

const DashboardHeader: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Redirect to a search results page or filter the current page content
    navigate(`/search?query=${query}`);
  };

  return (
    <Container fluid className="p-3 bg-light">
      <InputGroup className="search-bar">
        <FormControl
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch} variant="primary">
          Search
        </Button>
      </InputGroup>
    </Container>
  );
};

export default DashboardHeader;
