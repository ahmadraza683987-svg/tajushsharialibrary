// src/app/page.js
"use client";

import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import CategorySection from "../components/CategorySection";
import TodayBook from "../components/TodayBook";
import FeaturedBooks from "../components/FeaturedBooks";
import BookGrid from "../components/BookGrid";
import booksDataRaw from "../data/books.json";

/* Helper: highlight matched substring (returns HTML string) */
function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, "ig");
  return text.replace(re, "<mark>$1</mark>");
}

export default function Home() {
  const [q, setQ] = useState("");
  const booksData = booksDataRaw;

  // filtered results for live search (match any char, min 1 char)
  const results = useMemo(() => {
    const term = q.trim();
    if (!term) return [];
    return booksData
      .map(book => {
        const titleMatch = book.title.toLowerCase().includes(term.toLowerCase());
        const authorMatch = book.author?.toLowerCase().includes(term.toLowerCase());
        if (titleMatch || authorMatch) {
          return {
            ...book,
            highlightedTitle: highlight(book.title, term),
            highlightedAuthor: highlight(book.author || "", term)
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [q, booksData]);

  return (
    <section className="home-page">
      {/* NOTE: Header is in layout; do not render header here */}
      <div className="hero-card">
        <h1 className="title-urdu">تاج الشریعہ لائبریری</h1>
        <h2 className="title-roman">Tajush Sharia Library</h2>
        <p className="lead">
          دینی کتب کا آن لائن ذخیرہ — پڑھیں، تلاش کریں، ڈاؤنلوڈ کریں 📚
        </p>
      </div>

      {/* Search (appears on every page in layout as per request? We keep here and other pages can include SearchBar too) */}
      <div className="search-zone">
        <SearchBar q={q} setQ={setQ} />
        {/* Live results: show directly under search (above Today's book) */}
        {results.length > 0 && (
          <div className="live-results">
            <h3>تلاش کے نتائج</h3>
            <BookGrid books={results} highlightMode />
          </div>
        )}
      </div>

      {/* Categories */}
      <CategorySection />

      {/* Today's Book (above featured) */}
      <TodayBook books={booksData} />

      {/* Featured Books */}
      <FeaturedBooks books={booksData} />

      {/* Also show some recent/all books below as grid */}
      <section style={{ marginTop: 20 }}>
        <h3 className="section-title">تمام کتابیں</h3>
        <BookGrid books={booksData.slice(0, 12)} />
      </section>
    </section>
  );
}
