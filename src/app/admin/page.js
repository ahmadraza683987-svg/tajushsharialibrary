"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("adminLoggedIn");
    if (saved === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    if (password === "tajadmin123") {
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoggedIn(true);
    } else {
      alert("❌ غلط پاسورڈ");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <main className="main-content">
        <h2>📘 ایڈمن ڈیش بورڈ</h2>
        <p>خوش آمدید! آپ کتابیں شامل یا تبدیل کر سکتے ہیں۔</p>

        <Link href="/admin/upload" className="btn" style={{ marginTop: 10 }}>
          ➕ نئی کتاب شامل کریں
        </Link>

        <button className="btn outline" onClick={handleLogout} style={{ marginLeft: 10 }}>
          🔒 لاگ آؤٹ
        </button>
      </main>
    );
  }

  return (
    <main className="main-content">
      <h2>🔐 ایڈمن لاگ اِن</h2>
      <input
        type="password"
        placeholder="پاسورڈ درج کریں"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="search-input"
      />
      <button onClick={handleLogin} className="btn" style={{ marginTop: 10 }}>
        🔑 لاگ اِن
      </button>
    </main>
  );
}
