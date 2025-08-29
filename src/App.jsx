import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";

const LIMIT = 20;

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [numFound, setNumFound] = useState(0);

  const fetchBooks = async (searchQuery, pageToFetch = 1, append = false) => {
    if (!searchQuery.trim()) {
      setBooks([]);
      setNumFound(0);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
        searchQuery
      )}&page=${pageToFetch}&limit=${LIMIT}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      const docs = data.docs || [];
      setNumFound(data.numFound || docs.length);
      setBooks(prev => (append ? [...prev, ...docs] : docs));
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (q) => {
    setQuery(q);
    setPage(1);
    await fetchBooks(q, 1, false);
  };

  const handleLoadMore = async () => {
    const next = page + 1;
    setPage(next);
    await fetchBooks(query, next, true);
  };

  return (
    <div className="app">
      <header>
        <h1>Book Finder</h1>
        <p className="subtitle">Search books by title (Open Library)</p>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} initialValue={query} />

        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}

        {!loading && books.length === 0 && query && (
          <div className="no-results">No results found for “{query}”.</div>
        )}

        <div className="results-grid">
          {books.map((b, idx) => (
            <BookCard key={`${b.key}-${idx}`} book={b} />
          ))}
        </div>

        {books.length > 0 && books.length < numFound && (
          <div className="load-more-wrap">
            <button onClick={handleLoadMore} className="load-more" disabled={loading}>
              {loading ? "Loading..." : "Load more"}
            </button>
            <div className="results-info">
              Showing {books.length} of {numFound} results
            </div>
          </div>
        )}
      </main>

      <footer>
        <small>Data from Open Library</small>
      </footer>
    </div>
  );
}
