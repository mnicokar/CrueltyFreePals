import React, { useState, useEffect } from "react";
import "./SearchBrand.css";
const SearchBrand = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the cruelty-free data when the component mounts
    fetch("crueltyfreepeta.txt")
      .then((response) => response.text())
      .then((data) => {
        const parsedData = data
          .split("\n")
          .filter((line) => line.trim() !== "");
        setSearchResults(parsedData);
        setOriginalData(parsedData); // Keep a copy of the original data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    // Filter search results based on the search term
    const filteredResults = originalData.filter((result) =>
      result.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredResults);
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
