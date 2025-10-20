"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import booksData from "../../../data/books.json";

export default function BookDetail({ params }) {
  // ✅ Correct way to unwrap params in Next.js 15
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const found = booksData.find(
      (b) => String(b.id) === id || b.title === decodeURIComponent(id)
    );
    setBook(found);

    if (found) {
      const rel = booksData.filter(
        (b) =>
          b.id !== found.id &&
          (b.category === found.category ||
            b.author === found.author ||
            b.subcategory === found.subcategory)
      );
      setRelated(rel.slice(0, 4)); // صرف 4 دکھائیں
    }
  }, [id]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  const toggleFavorite = (book) => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favs.find((b) => b.id === book.id);
    if (exists) {
      favs = favs.filter((b) => b.id !== book.id);
    } else {
      favs.push(book);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
    setFavorites(favs);
  };

  const isFavorite = (id) => favorites.some((b) => b.id === id);

  if (!book) return <div className="loading">📚 کتاب لوڈ ہو رہی ہے...</div>;

  return (
    <div className="book-detail-page main-content">
      <div className="detail-grid">
        <img src={book.cover} alt={book.title} className="detail-cover" />
        <div className="detail-meta">
          <h1>{book.titleUrdu || book.title}</h1>
          <p className="author">✍️ {book.author}</p>
          <p className="desc">{book.description}</p>
          <div className="actions">
            <Link href={`/viewer/${book.id}`} className="btn">
              👓 آن لائن دیکھیں
            </Link>
            {book.pdf && (
              <a href={book.pdf} target="_blank" className="btn outline">
                ⬇️ Download
              </a>
            )}
            <button
              className={`fav-btn ${isFavorite(book.id) ? "is-fav" : ""}`}
              onClick={() => toggleFavorite(book)}
            >
              ❤️ {isFavorite(book.id) ? "محفوظ شدہ" : "پسند کریں"}
            </button>
          </div>
        </div>
      </div>

      {/* === Related Books Section === */}
      {related.length > 0 && (
        <div className="related-section">
          <h3>📖 مشابہ کتابیں</h3>
          <div className="book-grid">
            {related.map((b) => (
              <div key={b.id} className="card">
                <img src={b.cover} alt={b.title} className="card-cover" />
                <div className="card-body">
                  <h4 className="card-title">{b.titleUrdu || b.title}</h4>
                  <p className="card-author">{b.author}</p>
                  <Link href={`/books/${b.id}`} className="btn small">
                    مزید دیکھیں →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
