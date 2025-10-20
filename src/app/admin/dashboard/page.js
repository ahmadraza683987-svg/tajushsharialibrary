"use client";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="main-content" style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>👑 ایڈمن ڈیش بورڈ</h2>
      <p>خوش آمدید! یہاں سے آپ اپنی ویب سائٹ کو مینیج کر سکتے ہیں۔</p>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <Link className="btn" href="/admin/upload">📤 نئی کتاب اپلوڈ کریں</Link>
        <Link className="btn" href="/admin/manage">📚 کتابوں کا انتظام</Link>
      </div>
    </div>
  );
}
