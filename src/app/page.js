"use client";
import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import CategorySection from "../components/CategorySection";
import FeaturedBooks from "../components/FeaturedBooks";
import TodayBook from "../components/TodayBook";
import BookGrid from "../components/BookGrid";
import { fetchBooks } from "../utils/fetchBooks"; // ✅ Firestore سے ڈیٹا لانے کیلئے

export default function Home() {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState([]); // ✅ Firestore books
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function loadBooks() {
      const data = await fetchBooks();
      setBooks(data);
    }
    loadBooks();
  }, []);

  // 🔍 Search Logic
  const highlight = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const resultsMemo = useMemo(() => {
    if (!q.trim()) return [];
    return books
      .map((book) => {
        const titleMatch = book.title?.toLowerCase().includes(q.toLowerCase());
        const authorMatch = book.author?.toLowerCase().includes(q.toLowerCase());
        if (titleMatch || authorMatch) {
          return {
            ...book,
            highlightedTitle: highlight(book.title, q),
            highlightedAuthor: highlight(book.author || "", q),
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [q, books]);

  useEffect(() => {
    setResults(resultsMemo);
  }, [resultsMemo]);

  return (
    <section className="home-page">
      <div className="hero-card">
        <h1 className="title-urdu">تاج الشریعہ لائبریری</h1>
        <h2 className="title-roman">Tajush Sharia Library</h2>
        <p className="lead">
          دینی کتب کا آن لائن ذخیرہ — پڑھیں، تلاش کریں، ڈاؤنلوڈ کریں 📚
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-zone">
        <SearchBar q={q} setQ={setQ} />
        {results.length > 0 && (
          <div className="live-results">
            <h3>تلاش کے نتائج</h3>
            <BookGrid books={results} highlightMode />
          </div>
        )}
      </div>

      {/* Categories */}
      <CategorySection />

      {/* آج کی کتاب */}
      <TodayBook books={books} />

      {/* نمایاں کتابیں */}
      <FeaturedBooks books={books} />

      {/* تمام کتابیں */}
      <section style={{ marginTop: 20 }}>
        <h3 className="section-title">تمام کتابیں</h3>
        <BookGrid books={books.slice(0, 12)} />
      </section>
    </section>
  );
}
