// src/app/admin/upload/page.js
"use client";
import { useState } from "react";
import { db, storage } from "../../../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminUpload() {
  const [titleUrdu, setTitleUrdu] = useState("");
  const [titleRoman, setTitleRoman] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("درسی کتابیں");
  const [subcategory, setSubcategory] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let coverUrl = "";

      if (coverFile) {
        const storageRef = ref(storage, `covers/${Date.now()}_${coverFile.name}`);
        await uploadBytes(storageRef, coverFile);
        coverUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "books"), {
        titleUrdu,
        titleRoman,
        author,
        category,
        subcategory,
        pdfLink,
        coverUrl,
        createdAt: Timestamp.now()
      });

      alert("✅ کتاب کامیابی سے اپلوڈ ہو گئی!");
      setTitleUrdu("");
      setTitleRoman("");
      setAuthor("");
      setPdfLink("");
      setSubcategory("");
      setCoverFile(null);
    } catch (err) {
      console.error("Error uploading book:", err);
      alert("❌ Error uploading book");
    }

    setUploading(false);
  };

  return (
    <div className="main-content">
      <h2>📚 ایڈمن اپلوڈ پینل</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        <input type="text" placeholder="عنوان (اردو)" value={titleUrdu} onChange={(e) => setTitleUrdu(e.target.value)} required />
        <input type="text" placeholder="Title (Roman Urdu)" value={titleRoman} onChange={(e) => setTitleRoman(e.target.value)} required />
        <input type="text" placeholder="مصنف کا نام" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="درسی کتابیں">درسی کتابیں</option>
          <option value="غیر درسی کتابیں">غیر درسی کتابیں</option>
        </select>

        {category === "درسی کتابیں" && (
          <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
            <option value="">سب کیٹیگری منتخب کریں</option>
            <option value="کتابیں">کتابیں</option>
            <option value="شروحات">شروحات</option>
          </select>
        )}

        <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
        <input type="url" placeholder="PDF یا Google Drive لنک" value={pdfLink} onChange={(e) => setPdfLink(e.target.value)} required />

        <button type="submit" disabled={uploading} style={{ backgroundColor: "#0b5394", color: "#fff", padding: "10px", border: "none", borderRadius: "8px" }}>
          {uploading ? "Uploading..." : "کتاب اپلوڈ کریں"}
        </button>
      </form>
    </div>
  );
}
