// ✅ src/utils/fetchBooks.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchBooks() {
  try {
    const snapshot = await getDocs(collection(db, "books"));
    const books = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("📚 Firestore سے کتابیں:", books);
    return books;
  } catch (error) {
    console.error("❌ Firestore fetchBooks Error:", error);
    return [];
  }
}
