// src/components/BookGrid.js
"use client";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export default function BookGrid({ books = [], title }) {
  if (!books.length) {
    return (
      <section className="book-grid-section">
        {title && <h3 className="section-title">{title}</h3>}
        <p>کوئی کتاب موجود نہیں۔</p>
      </section>
    );
  }

  return (
    <section className="book-grid-section">
      {title && <h3 className="section-title">{title}</h3>}
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <Link href={`/books/${book.id}`} className="book-link">
              <img src={book.cover} alt={book.title} className="book-cover" />
              <h4 className="book-title">{book.title}</h4>
              {book.romanTitle && (
                <p className="book-roman">{book.romanTitle}</p>
              )}
              <p className="book-author">{book.author}</p>
            </Link>

            <div className="book-actions">
              {book.download && (
                <a
                  href={book.download}
                  target="_blank"
                  rel="noreferrer"
                  className="btn small outline"
                >
                  ڈاؤنلوڈ
                </a>
              )}
              <FavoriteButton book={book} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
