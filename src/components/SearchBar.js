// src/components/SearchBar.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import booksData from "../data/books.json";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!q || q.trim() === "") {
      setResults([]);
      return;
    }
    const term = q.trim().toLowerCase();
    const matches = booksData.filter((b) =>
      [b.title, b.romanTitle || "", b.author || ""]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
    setResults(matches);
  }, [q]);

  const highlight = (text) => {
    if (!q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <div className="searchbar-wrap layout-searchbar">
      <input
        type="search"
        className="search-input"
        placeholder="🔍 کتاب یا مصنف تلاش کریں — ایک حرف کافی ہے"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {q && <button className="clear-btn" onClick={() => setQ("")}>❌</button>}

      {results.length > 0 && (
        <div className="live-results layout-live-results" role="list">
          {results.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className="live-item">
              <img src={book.cover} alt={book.title} />
              <div className="live-meta">
                <div className="live-title" dangerouslySetInnerHTML={{ __html: highlight(book.title) }} />
                <div className="live-author" dangerouslySetInnerHTML={{ __html: highlight(book.author || "") }} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
