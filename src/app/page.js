"use client";
import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import CategorySection from "../components/CategorySection";
import FeaturedBooks from "../components/FeaturedBooks";
import TodayBook from "../components/TodayBook";
import BookGrid from "../components/BookGrid";
import { fetchBooks } from "../utils/fetchBooks"; // Firestore سے ڈیٹا لانے کیلئے
import { getAllBooks } from "../utils/getBooks"; // localStorage + books.json

export default function Home() {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState([]);
  const [results, setResults] = useState([]);

  // 📚 کتابیں لوڈ کرو (Firestore + Local merge)
  useEffect(() => {
    async function loadBooks() {
      const cloudBooks = await fetchBooks();
      const localBooks = getAllBooks();
      const merged = [...localBooks, ...cloudBooks];
      setBooks(merged);
    }
    loadBooks();
  }, []);

  // 🔍 سرچ کیلئے highlight فنکشن
  const highlight = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  // ⚡ سرچ کا حساب صرف q یا books بدلنے پر
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
      {/* Hero Section */}
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
            <h3>🔍 تلاش کے نتائج</h3>
            <div className="book-grid">
              {results.map((b) => (
                <div key={b.id} className="book-card">
                  <img
                    src={b.cover || "/default-cover.jpg"}
                    alt={b.title}
                    className="book-cover"
                  />
                  <h4
                    className="book-title"
                    dangerouslySetInnerHTML={{ __html: b.highlightedTitle }}
                  />
                  <p
                    className="book-author"
                    dangerouslySetInnerHTML={{ __html: b.highlightedAuthor }}
                  />
                </div>
              ))}
            </div>
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
