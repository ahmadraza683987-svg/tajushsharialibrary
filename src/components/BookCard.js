// src/components/BookCard.js
"use client";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export default function BookCard({ book, highlightMode = false }) {
  // If highlightMode, title may contain HTML mark tags already
  return (
    <article className="card">
      <img src={book.cover} alt={book.title} className="card-cover" />
      <div className="card-body">
        <h4 className="card-title" dangerouslySetInnerHTML={{ __html: book.highlightedTitle || book.title }} />
        <p className="card-author">{book.highlightedAuthor || book.author}</p>
        <div className="card-actions">
          <Link href={`/books/${book.id}`} className="btn small">تفصیل</Link>
          {book.file_url && <a href={book.file_url} target="_blank" rel="noreferrer" className="btn small outline">ڈاؤنلوڈ</a>}
          <FavoriteButton book={book} />
        </div>
      </div>
    </article>
  );
}
