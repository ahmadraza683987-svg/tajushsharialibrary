// src/app/favorites/page.js
"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function FavoritesPage() {
  const [user, setUser] = useState(null);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, "users", u.uid));
        const items = (snap.exists() && snap.data().favorites) || [];
        setFav(items);
      } else {
        const local = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFav(local);
      }
    });
    return () => unsub();
  }, []);

  return (
    <main className="main-content">
      <h2 className="section-title">❤️ میری پسندیدہ کتابیں</h2>
      {fav.length === 0 ? <p>آپ نے ابھی تک کوئی کتاب پسندیدہ میں شامل نہیں کی۔</p> : (
        <div className="book-grid">
          {fav.map(b => (
            <div className="card" key={b.id || b.title}>
              <img src={b.cover || "/default-book.jpg"} className="card-cover" />
              <div className="card-body">
                <h4 className="card-title">{b.titleUrdu || b.title || b.titleRoman}</h4>
                <p className="card-author">{b.author}</p>
                {b.pdfLink || b.download ? <a href={b.pdfLink || b.download} className="btn small" target="_blank">Download</a> : null}
                {b.id && <Link href={`/books/${b.id}`} className="btn outline">تفصیل</Link>}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
