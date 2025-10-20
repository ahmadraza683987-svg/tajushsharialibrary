// src/components/Header.js
"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import syncLocalToCloud from "../utils/syncLocalToCloud";

export default function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          await syncLocalToCloud(u.uid);
        } catch (e) {
          console.error("Sync failed:", e);
        }
      }
    });
    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
      alert("Login failed.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // ✅ click outside menu to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <Link href="/" className="site-logo">تاج الشریعہ لائبریری</Link>
          <span className="site-sub">Tajush Sharia Library</span>
        </div>

        {/* ☰ Menu Toggle Button */}
        <button className="menu-toggle" onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}>
          ☰
        </button>

        <nav ref={menuRef} className={`header-nav ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>🏠 ہوم</Link>
          <Link href="/books" onClick={() => setMenuOpen(false)}>📚 کتب</Link>
          <Link href="/favorites" onClick={() => setMenuOpen(false)}>❤️ میری پسندیدہ</Link>
          <Link href="/admin/upload" onClick={() => setMenuOpen(false)}>📤 ایڈمن اپلوڈ</Link>
          <Link href="/admin/manage" onClick={() => setMenuOpen(false)}>⚙️ کتابوں کا انتظام</Link>

          {user ? (
            <>
              <span className="user-name">👤 {user.displayName || user.email}</span>
              <button onClick={handleLogout} className="btn small outline">🔓 لاگ آؤٹ</button>
            </>
          ) : (
            <button onClick={loginWithGoogle} className="btn small">🔑 لاگ اِن</button>
          )}
        </nav>
      </div>
    </header>
  );
}
