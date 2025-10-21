"use client";
import React, { useEffect, useState } from "react";
import booksData from "../data/books.json";
import styles from "../styles/TodayBook.module.css";


export default function TodayBook() {
  const [todayBook, setTodayBook] = useState(null);

  useEffect(() => {
    const index = new Date().getDate() % booksData.length;
    setTodayBook(booksData[index]);
  }, []);

  if (!todayBook) return null;

  return (
    <section className="today-section">
      <h3 className="section-title">📖 آج کی کتاب (Today’s Book)</h3>
      <div className="today-card">
        <img
          src={todayBook.cover}
          alt={todayBook.title}
          width={120}
          height={150}
        />
        <div className="today-meta">
          <h4>{todayBook.title}</h4>
          <p className="author">{todayBook.author}</p>
          <p>{todayBook.description}</p>
          <a className="btn small" href={todayBook.download} target="_blank">
            Download
          </a>
        </div>
      </div>
    </section>
  );
}
