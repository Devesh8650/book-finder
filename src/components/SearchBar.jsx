import React, { useState } from "react";

/**
 * Simple search bar with form submit.
 * Calls onSearch(query) when submitted.
 */

export default function SearchBar({ onSearch, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);

  const submit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className="searchbar" onSubmit={submit}>
      <input
        type="search"
        placeholder="Enter book title (e.g., The Lord of the Rings)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search books by title"
      />
      <button type="submit">Search</button>
    </form>
  );
}
