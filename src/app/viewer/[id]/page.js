"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import booksData from "../../../data/books.json";

export default function PDFViewer({ params }) {
  const [book, setBook] = useState(null);
  const [bookId, setBookId] = useState(null);

  // ✅ Handle Next.js 15 Promise-based params
  useEffect(() => {
    async function unwrapParams() {
      const resolved = await params;
      const id = resolved?.id || resolved?.params?.id;
      setBookId(id);
    }
    unwrapParams();
  }, [params]);

  // ✅ Fetch book details once ID is available
  useEffect(() => {
    if (!bookId) return;
    const found = booksData.find(
      (b) => String(b.id) === String(bookId) || b.title === decodeURIComponent(bookId)
    );
    setBook(found);
  }, [bookId]);

  if (!book) return <div className="loading">📄 کتاب لوڈ ہو رہی ہے...</div>;

  return (
    <div className="pdf-viewer-page">
      <header className="viewer-header">
        <Link href={`/books/${book.id}`} className="btn small outline">
          ← واپس جائیں
        </Link>
        <h2>{book.titleUrdu || book.title}</h2>
      </header>

      <div className="viewer-frame-wrap">
        {book.pdf ? (
          <iframe
            src={`${book.pdf}#toolbar=1&navpanes=0&scrollbar=1`}
            className="pdf-frame"
            title={book.title}
            style={{
              width: "100%",
              height: "90vh",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            }}
          />
        ) : (
          <p className="no-pdf">⚠️ اس کتاب کی PDF دستیاب نہیں۔</p>
        )}
      </div>
    </div>
  );
}
