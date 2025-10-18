"use client";
import { use, useEffect, useState } from "react";
import booksData from "../../../data/books.json";
import Link from "next/link";

export default function BookViewer({ params }) {
  const resolvedParams = use(params); // ✅ unwrap promise
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
    <main className="main-content">
      <h2>{book.title}</h2>
      <p>{book.author}</p>

      <iframe
        src={book.pdf || book.download}
        width="100%"
        height="650px"
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          marginTop: "10px",
        }}
        title={book.title}
      ></iframe>

      <div style={{ marginTop: "10px" }}>
        <Link href={`/books/${book.id}`} className="btn outline">
          ← واپس تفصیل پر
        </Link>
      </div>
    </main>
  );
}
