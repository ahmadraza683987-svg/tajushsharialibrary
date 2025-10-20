// src/utils/saveBook.js

export async function saveBookToJSON(newBook) {
  try {
    // مقامی اسٹوریج سے پرانی کتابیں نکالو
    const existingData = localStorage.getItem("booksData");
    const books = existingData ? JSON.parse(existingData) : [];

    // نئی کتاب شامل کرو
    const updated = [...books, newBook];
    localStorage.setItem("booksData", JSON.stringify(updated));

    return true;
  } catch (error) {
    console.error("❌ Error saving book:", error);
    return false;
  }
}
