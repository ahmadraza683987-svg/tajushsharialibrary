// ✅ src/utils/uploadBook.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function uploadBook(bookData) {
  try {
    const docRef = await addDoc(collection(db, "books"), {
      ...bookData,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Book uploaded:", docRef.id);
    return true;
  } catch (error) {
    console.error("❌ Upload Error:", error);
    return false;
  }
}
