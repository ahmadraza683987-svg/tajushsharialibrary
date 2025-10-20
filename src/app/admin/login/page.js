"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } catch (err) {
      setError("❌ غلط ای میل یا پاس ورڈ");
    }
  };

  return (
    <div className="main-content" style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🔐 ایڈمن لاگ اِن</h2>
      <form onSubmit={handleLogin} style={{ display: "inline-block", marginTop: "20px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>
        <input
          type="email"
          placeholder="ای میل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "250px", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="پاس ورڈ"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "250px", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ background: "#0b5394", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>
          🔑 لاگ اِن
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
}
