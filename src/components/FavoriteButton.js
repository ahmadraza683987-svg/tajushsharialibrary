// src/components/FavoriteButton.js
"use client";
import { useEffect, useState } from "react";

export default function FavoriteButton({ book }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFav(existing.some((b) => String(b.id) === String(book.id)));
    } catch {
      setIsFav(false);
    }
  }, [book.id]);

  function toggleFav() {
    try {
      const existing = JSON.parse(localStorage.getItem("favorites") || "[]");
      const exists = existing.some((b) => String(b.id) === String(book.id));
      let updated;
      if (exists) {
        updated = existing.filter((b) => String(b.id) !== String(book.id));
        setIsFav(false);
      } else {
        updated = [...existing, book];
        setIsFav(true);
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      // dispatch storage event for other tabs/components (optional)
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <button onClick={toggleFav} className={`fav-btn ${isFav ? "is-fav" : ""}`} title="Add to favorites">
      {isFav ? "❤️ پسندیدہ" : "🤍 پسندیدہ میں شامل کریں"}
    </button>
  );
}
