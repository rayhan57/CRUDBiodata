import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function SearchData({ searchText, setSearchText, handleSearch }) {
  return (
    <InputGroup>
      <Form.Control
        placeholder="Cari..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={(e) => {
          e.key === "Enter" ? handleSearch() : null;
        }}
      />
      <Button variant="outline-success" onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </Button>
    </InputGroup>
  );
}

export default SearchData;
