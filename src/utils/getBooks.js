// src/utils/getBooks.js
export default function getAllBooks() {
  let staticBooks = [];
  let customBooks = [];

  try {
    staticBooks = require("../data/books.json");
  } catch {
    staticBooks = [];
  }

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("customBooks");
    if (saved) customBooks = JSON.parse(saved);
  }

  const combined = [...staticBooks, ...customBooks];

  // Randomize for featured books
  const shuffled = [...combined].sort(() => 0.5 - Math.random());

  const todayBook = shuffled[0] || null;
  const featured = shuffled.slice(1, 5);

  return { combined, todayBook, featured };
}
