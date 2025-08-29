import React from "react";

/**
 * BookCard presents one result.
 * Uses cover_i or isbn for the cover; otherwise shows a placeholder SVG.
 */

function getCoverUrl(book) {
  const coverId = book.cover_i;
  const isbn = book.isbn && book.isbn[0];
  if (coverId) return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  if (isbn) return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  // inline SVG placeholder as data URI
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='300'><rect width='100%' height='100%' fill='%23ddd'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='16'>No Cover</text></svg>`
  );
  return `data:image/svg+xml;utf8,${svg}`;
}

export default function BookCard({ book }) {
  const cover = getCoverUrl(book);
  const title = book.title || "Untitled";
  const authors = book.author_name ? book.author_name.join(", ") : "Unknown author";
  const year = book.first_publish_year || "—";
  // Book URL: prefer key (often /works/OL...W)
  const openLibUrl = book.key ? `https://openlibrary.org${book.key}` : `https://openlibrary.org/search?q=${encodeURIComponent(title)}`;

  return (
    <article className="book-card">
      <a href={openLibUrl} target="_blank" rel="noopener noreferrer" className="cover-link">
        <img src={cover} alt={`Cover for ${title}`} className="cover" />
      </a>
      <div className="card-body">
        <h3 className="book-title">{title}</h3>
        <p className="book-authors">{authors}</p>
        <p className="book-year">First published: {year}</p>
        <a className="openlib-link" href={openLibUrl} target="_blank" rel="noopener noreferrer">
          View on Open Library →
        </a>
      </div>
    </article>
  );
}
