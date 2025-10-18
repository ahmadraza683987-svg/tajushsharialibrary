// src/app/favorites/page.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const [fav, setFav] = useState([]);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFav(items);
    } catch {
      setFav([]);
    }

    // listen to storage events (if favorites updated elsewhere)
    function onStorage() {
      try {
        const items = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFav(items);
      } catch {
        setFav([]);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <main className="main-content">
      <h2 className="section-title">❤️ میری پسندیدہ کتابیں</h2>
      {fav.length === 0 ? (
        <p>آپ نے ابھی تک کوئی کتاب پسندیدہ میں شامل نہیں کی۔</p>
      ) : (
        <div className="book-grid">
          {fav.map((book) => (
            <div key={book.id} className="card">
              <img src={book.cover} alt={book.title} className="card-cover" />
              <div className="card-body">
                <h4 className="card-title">{book.title}</h4>
                <p className="card-author">{book.author}</p>
                {book.download && (
                  <a href={book.download} target="_blank" rel="noreferrer" className="btn small">
                    Download
                  </a>
                )}
                <Link href={`/books/${book.id}`} className="btn outline">تفصیل</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
