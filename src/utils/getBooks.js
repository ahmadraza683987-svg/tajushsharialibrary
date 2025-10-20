// src/utils/getBooks.js

import booksData from "../data/books.json";

export function getAllBooks() {
  try {
    const localData = localStorage.getItem("booksData");
    if (localData) {
      const parsed = JSON.parse(localData);
      return [...booksData, ...parsed];
    }
    return booksData;
  } catch (error) {
    console.error("❌ Error reading books:", error);
    return booksData;
  }
}
