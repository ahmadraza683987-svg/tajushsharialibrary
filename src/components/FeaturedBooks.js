"use client";
import React, { useEffect, useState } from "react";
import booksData from "../data/books.json";

export default function FeaturedBooks() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const shuffled = [...booksData].sort(() => 0.5 - Math.random());
    setFeatured(shuffled.slice(0, 4));
  }, []);

  return (
    <section className="featured-section">
      <h3 className="section-title">🌟 نمایاں کتابیں (Featured Books)</h3>
      <div className="book-grid">
        {featured.map((book) => (
          <div key={book.id} className="card">
            <img src={book.cover} alt={book.title} className="card-cover" />
            <div className="card-body">
              <h4 className="card-title">{book.title}</h4>
              <p className="card-author">{book.author}</p>
              <a href={book.download} target="_blank" className="btn small">
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
