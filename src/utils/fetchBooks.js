// src/utils/fetchBooks.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function fetchBooks() {
  const querySnapshot = await getDocs(collection(db, "books"));
  const books = [];
  querySnapshot.forEach((doc) => {
    books.push({ id: doc.id, ...doc.data() });
  });
  return books;
}
