"use client";
import React, { useState } from "react";
import { uploadBook } from "../../../utils/uploadBook";

export default function UploadBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const bookData = { title, author, category, cover, pdfUrl };
    const success = await uploadBook(bookData);

    if (success) {
      setMessage("✅ کتاب کامیابی سے اپلوڈ ہوگئی!");
      setTitle("");
      setAuthor("");
      setCategory("");
      setCover("");
      setPdfUrl("");
    } else {
      setMessage("❌ اپلوڈ ناکام! دوبارہ کوشش کریں۔");
    }
  };

  return (
    <section className="upload-page">
      <h2>📘 نئی کتاب اپلوڈ کریں</h2>
      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="text"
          placeholder="کتاب کا نام"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="مصنف کا نام"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="کیٹیگری"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="url"
          placeholder="کور فوٹو کا لنک"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        <input
          type="url"
          placeholder="PDF فائل کا لنک (Google Drive)"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
        />
        <button type="submit">کتاب اپلوڈ کریں</button>
      </form>

      {message && <p className="upload-message">{message}</p>}
    </section>
  );
}
