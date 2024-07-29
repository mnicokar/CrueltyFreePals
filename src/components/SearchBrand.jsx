import React, { useState, useEffect } from "react";
import "./SearchBrand.css";

const SearchBrand = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBrands = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/search?query=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data.map((item) => item.line));
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    fetchBrands(newSearchTerm);
  };

  return (
    <div>
      <h1>Cruelty-Free Product Search</h1>
      <input
        type="text"
        placeholder="Search for a brand..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          backgroundColor: "#ffffff",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>These Brands ARE Cruelty Free!</h2>
          <ul className="search-results">
            {searchResults.map((result, index) => (
              <li key={index} className="search-result-item">
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBrand;
