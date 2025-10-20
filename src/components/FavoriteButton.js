// src/components/FavoriteButton.js
"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function FavoriteButton({ book }) {
  const [isFav, setIsFav] = useState(false);
  const [user, setUser] = useState(null);
  const localKey = "favorites";

  useEffect(() => {
    // auth state
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      // after auth state set, compute isFav (either from cloud or local)
      checkFav(u);
    });
    // initial local check
    checkFav(null);
    return () => unsub();
  }, [book.id]);

  async function checkFav(u) {
    if (u) {
      try {
        const docRef = doc(db, "users", u.uid);
        const snap = await getDoc(docRef);
        const favs = (snap.exists() && snap.data().favorites) || [];
        setIsFav(favs.some((b) => String(b.id) === String(book.id)));
      } catch (e) {
        console.error(e);
        // fallback to local
        const local = JSON.parse(localStorage.getItem(localKey) || "[]");
        setIsFav(local.some((b) => String(b.id) === String(book.id)));
      }
    } else {
      const local = JSON.parse(localStorage.getItem(localKey) || "[]");
      setIsFav(local.some((b) => String(b.id) === String(book.id)));
    }
  }

  async function toggleFav() {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      const current = (snap.exists() && snap.data().favorites) || [];
      const exists = current.some((b) => String(b.id) === String(book.id));
      let updated;
      if (exists) {
        updated = current.filter((b) => String(b.id) !== String(book.id));
      } else {
        updated = [...current, book];
      }
      await setDoc(userRef, { favorites: updated }, { merge: true });
      setIsFav(!exists);
    } else {
      const local = JSON.parse(localStorage.getItem(localKey) || "[]");
      const exists = local.some((b) => String(b.id) === String(book.id));
      let updated;
      if (exists) {
        updated = local.filter((b) => String(b.id) !== String(book.id));
        setIsFav(false);
      } else {
        updated = [...local, book];
        setIsFav(true);
      }
      localStorage.setItem(localKey, JSON.stringify(updated));
    }
  }

  return (
    <button onClick={toggleFav} className={`fav-btn ${isFav ? "is-fav" : ""}`} title="Add to favorite">
      {isFav ? "❤️ پسندیدہ" : "🤍 پسندیدہ میں شامل کریں"}
    </button>
  );
}
