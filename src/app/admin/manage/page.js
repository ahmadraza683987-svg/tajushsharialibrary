"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all books from Firestore
  const fetchBooks = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "books"));
    const bookList = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setBooks(bookList);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ Delete Book
  const handleDelete = async (id) => {
    if (confirm("کیا آپ واقعی اس کتاب کو حذف کرنا چاہتے ہیں؟")) {
      await deleteDoc(doc(db, "books", id));
      alert("❌ کتاب حذف کر دی گئی!");
      fetchBooks();
    }
  };

  // ✅ Start Editing
  const handleEdit = (book) => {
    setEditingBook(book);
  };

  // ✅ Save Edited Book
  const handleSaveEdit = async () => {
    const docRef = doc(db, "books", editingBook.id);
    await updateDoc(docRef, {
      titleUrdu: editingBook.titleUrdu,
      titleRoman: editingBook.titleRoman,
      author: editingBook.author,
      category: editingBook.category,
      subcategory: editingBook.subcategory,
      pdfLink: editingBook.pdfLink,
      coverUrl: editingBook.coverUrl,
    });
    alert("✅ کتاب کی معلومات اپڈیٹ ہو گئی!");
    setEditingBook(null);
    fetchBooks();
  };

  return (
    <div className="main-content">
      <h2>📘 ایڈمن پینل - کتابوں کا انتظام</h2>

      {loading ? (
        <p>⏳ کتابیں لوڈ ہو رہی ہیں...</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {books.length === 0 ? (
            <p>📭 ابھی کوئی کتاب اپلوڈ نہیں ہوئی ہے</p>
          ) : (
            books.map((book) => (
              <div key={book.id} style={{
                background: "#fff",
                padding: "14px",
                marginBottom: "10px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              }}>
                <h3>{book.titleUrdu}</h3>
                <p><b>مصنف:</b> {book.author}</p>
                <p><b>کیٹیگری:</b> {book.category} {book.subcategory ? `(${book.subcategory})` : ""}</p>
                {book.coverUrl && (
                  <img src={book.coverUrl} alt={book.titleUrdu} style={{ width: "100px", borderRadius: "6px" }} />
                )}
                <div style={{ marginTop: "8px" }}>
                  <button onClick={() => handleEdit(book)} style={{ background: "#0b5394", color: "#fff", padding: "6px 10px", border: "none", borderRadius: "6px", marginRight: "6px" }}>✏️ Edit</button>
                  <button onClick={() => handleDelete(book.id)} style={{ background: "red", color: "#fff", padding: "6px 10px", border: "none", borderRadius: "6px" }}>🗑️ Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ✅ Edit Modal */}
      {editingBook && (
        <div style={{
          position: "fixed",
          top: "0", left: "0", width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            background: "#fff", padding: "20px", borderRadius: "10px",
            width: "90%", maxWidth: "400px"
          }}>
            <h3>کتاب کی معلومات ایڈٹ کریں</h3>
            <input type="text" value={editingBook.titleUrdu} onChange={(e) => setEditingBook({ ...editingBook, titleUrdu: e.target.value })} placeholder="عنوان (اردو)" />
            <input type="text" value={editingBook.titleRoman} onChange={(e) => setEditingBook({ ...editingBook, titleRoman: e.target.value })} placeholder="Roman Title" />
            <input type="text" value={editingBook.author} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} placeholder="مصنف" />
            <input type="url" value={editingBook.pdfLink} onChange={(e) => setEditingBook({ ...editingBook, pdfLink: e.target.value })} placeholder="PDF لنک" />
            <button onClick={handleSaveEdit} style={{ background: "#0b5394", color: "#fff", padding: "8px 10px", border: "none", borderRadius: "6px", marginTop: "10px" }}>💾 محفوظ کریں</button>
            <button onClick={() => setEditingBook(null)} style={{ background: "#999", color: "#fff", padding: "8px 10px", border: "none", borderRadius: "6px", marginLeft: "6px" }}>❌ بند کریں</button>
          </div>
        </div>
      )}
    </div>
  );
}
