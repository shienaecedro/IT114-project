import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Item, Facility } from "../types"; // Import interfaces from types file
import "./SearchResults.css"; // Import the CSS file

const SearchResults: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchResults = () => {
      // Fetch from local storage and filter based on query
      const items: Item[] = JSON.parse(localStorage.getItem("items") || "[]");
      const facilities: Facility[] = JSON.parse(
        localStorage.getItem("facilities") || "[]"
      );

      const filteredItems = items.filter(
        (item) =>
          item.available && // Only include available items
          (item.category.toLowerCase().includes(query.toLowerCase()) ||
            item.brand.toLowerCase().includes(query.toLowerCase()) ||
            item.model.toLowerCase().includes(query.toLowerCase()))
      );

      const filteredFacilities = facilities.filter(
        (facility) =>
          facility.available && // Only include available facilities
          (facility.name.toLowerCase().includes(query.toLowerCase()) ||
            facility.location.toLowerCase().includes(query.toLowerCase()))
      );

      setResults([...filteredItems, ...filteredFacilities]);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Brand</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.category || result.name || "N/A"}</td>
                <td>{result.brand || "N/A"}</td>
                <td>{result.model || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No available items found.</p>
      )}
    </div>
  );
};

export default SearchResults;
