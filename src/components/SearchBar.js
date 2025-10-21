"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import booksData from "../data/books.json";
import styles from "../styles/SearchBar.module.css";


export default function SearchBar() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const wrapperRef = useRef(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(saved);
  }, []);

  // Update search results
  useEffect(() => {
    if (q.trim() === "") {
      setResults([]);
      return;
    }

    const matched = booksData.filter((b) => {
      const text = `${b.titleUrdu} ${b.titleRoman} ${b.author}`.toLowerCase();
      return text.includes(q.toLowerCase());
    });

    setResults(matched);
  }, [q]);

  // Save history when user searches
  const saveToHistory = (term) => {
    if (!term.trim()) return;
    const newHistory = [term, ...history.filter((h) => h !== term)].slice(0, 8);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  // Hide results when clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="searchbar-wrap" ref={wrapperRef}>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="search-input"
        placeholder="کتاب یا مصنف تلاش کریں..."
        onKeyDown={(e) => {
          if (e.key === "Enter") saveToHistory(q);
        }}
      />
      {q && (
        <button className="clear-btn" onClick={() => setQ("")}>
          ✕
        </button>
      )}

      {/* Search History */}
      {q === "" && history.length > 0 && (
        <div className="live-results">
          <div className="history-title">🔍 حالیہ تلاشات:</div>
          {history.map((term, i) => (
            <div
              key={i}
              className="history-item"
              onClick={() => setQ(term)}
            >
              {term}
            </div>
          ))}
        </div>
      )}

      {/* Live Search Results */}
      {q !== "" && results.length > 0 && (
        <div className="live-results">
          {results.slice(0, 10).map((b) => {
            const regex = new RegExp(`(${q})`, "gi");
            const title = (b.titleUrdu || b.title || b.titleRoman || "").replace(
              regex,
              "<mark>$1</mark>"
            );
            const author = (b.author || "").replace(regex, "<mark>$1</mark>");

            return (
              <Link
                key={b.id || b.title}
                href={`/books/${b.id || b.title}`}
                className="live-item"
                onClick={() => saveToHistory(q)}
              >
                <img
                  src={b.cover || "/default-book.jpg"}
                  alt={b.titleUrdu || b.title}
                  className="live-thumb"
                />
                <div className="live-meta">
                  <div
                    className="live-title"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  <div
                    className="live-author"
                    dangerouslySetInnerHTML={{ __html: author }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
