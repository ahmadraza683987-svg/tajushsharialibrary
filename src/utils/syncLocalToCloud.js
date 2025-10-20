// src/utils/syncLocalToCloud.js
import { db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Merge local favorites/searchHistory into user's Firestore doc.
 * - localFavorites: array of book objects
 * - localHistory: array of search strings
 */
export default async function syncLocalToCloud(uid) {
  if (!uid) return;

  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  const localFav = JSON.parse(localStorage.getItem("favorites") || "[]");
  const localHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");

  let server = snap.exists() ? snap.data() : { favorites: [], searchHistory: [] };

  // merge favorites by id
  const map = {};
  (server.favorites || []).forEach((b) => { if (b?.id) map[b.id] = b; });
  localFav.forEach((b) => { if (b?.id) map[b.id] = b; });

  const mergedFav = Object.values(map);

  // merge search history (preserve order: local first then server, dedup)
  const mergedHistory = [];
  const seen = new Set();
  [...localHistory, ...(server.searchHistory || [])].forEach((q) => {
    if (!q) return;
    const key = String(q).trim().toLowerCase();
    if (!seen.has(key)) { seen.add(key); mergedHistory.push(q); }
  });

  await setDoc(userRef, { favorites: mergedFav, searchHistory: mergedHistory }, { merge: true });

  // optionally clear local storage after merge or keep it — we'll keep it
  return { favorites: mergedFav, searchHistory: mergedHistory };
}
