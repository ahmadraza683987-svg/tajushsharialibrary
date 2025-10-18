"use client";
import { useState } from "react";
import Link from "next/link";

export default function UploadBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    cover: "",
    pdf: "",
    download: "",
    category: "",
    subcategory: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!book.title || !book.cover) {
      alert("📕 کتاب کا عنوان اور کور لازمی ہے");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("customBooks") || "[]");
    existing.push({ id: Date.now(), ...book });
    localStorage.setItem("customBooks", JSON.stringify(existing));

    alert("✅ کتاب کامیابی سے شامل ہو گئی!");
    setBook({
      title: "",
      author: "",
      description: "",
      cover: "",
      pdf: "",
      download: "",
      category: "",
      subcategory: "",
    });
  };

  return (
    <main className="main-content">
      <h2>➕ نئی کتاب شامل کریں</h2>
      <div style={{ display: "grid", gap: "10px", marginTop: "12px" }}>
        <input className="search-input" name="title" placeholder="عنوان" value={book.title} onChange={handleChange}/>
        <input className="search-input" name="author" placeholder="مصنف" value={book.author} onChange={handleChange}/>
        <input className="search-input" name="cover" placeholder="کتاب کا کور (تصویر کا لنک)" value={book.cover} onChange={handleChange}/>
        <input className="search-input" name="pdf" placeholder="PDF یا Drive لنک (اختیاری)" value={book.pdf} onChange={handleChange}/>
        <input className="search-input" name="download" placeholder="ڈاؤنلوڈ لنک (اختیاری)" value={book.download} onChange={handleChange}/>
        <input className="search-input" name="category" placeholder="کیٹیگری (درسی / غیر درسی)" value={book.category} onChange={handleChange}/>
        <input className="search-input" name="subcategory" placeholder="سبکیٹیگری (کتابیں / شروحات)" value={book.subcategory} onChange={handleChange}/>
        <textarea className="search-input" name="description" placeholder="تعارف" value={book.description} onChange={handleChange}/>
      </div>
      <button className="btn" style={{ marginTop: "10px" }} onClick={handleSubmit}>
        💾 محفوظ کریں
      </button>
      <Link href="/admin" className="btn outline" style={{ marginLeft: 10 }}>
        🔙 واپس جائیں
      </Link>
    </main>
  );
}
