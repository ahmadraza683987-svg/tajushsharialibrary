"use client";
import { use, useEffect, useState } from "react";
import booksData from "../../../data/books.json";
import Link from "next/link";

export default function BookDetail({ params }) {
  const resolvedParams = use(params); // ✅ unwrap params promise
  const { id } = resolvedParams;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const found = booksData.find((b) => String(b.id) === String(id));
    setBook(found || null);
  }, [id]);

  if (!book) {
    return (
      <main className="main-content">
        <p>کتاب نہیں ملی 📚</p>
      </main>
    );
  }

  return (
    <main className="main-content book-detail">
      <div className="detail-grid">
        <img src={book.cover} alt={book.title} className="detail-cover" />
        <div className="detail-meta">
          <h1>{book.title}</h1>
          <p className="author">{book.author}</p>
          <p>{book.description}</p>

          <div className="actions">
            {book.pdf && (
              <Link href={`/viewer/${book.id}`} className="btn outline">
                📖 آن لائن پڑھیں
              </Link>
            )}
            {book.download && (
              <a
                href={book.download}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                📥 ڈاؤنلوڈ
              </a>
            )}
{book.pdf && (
  <Link href={`/viewer/${book.id}`} className="btn outline">
    📖 آن لائن پڑھیں
  </Link>
)}
          </div>
        </div>
      </div>
    </main>
  );
}
