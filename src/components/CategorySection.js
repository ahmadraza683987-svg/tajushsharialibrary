// src/components/CategorySection.js
"use client";
import Link from "next/link";

export default function CategorySection() {
  return (
    <section className="categories">
      <h3 className="section-title">کیٹیگریز</h3>
      <div className="category-grid">
        <Link href="/darsee" className="category-card">درسی کتابیں<br/><span className="en">Darsee Kitabein</span></Link>
        <Link href="/ghair-darsee" className="category-card">غیر درسی کتابیں<br/><span className="en">Ghair Darsee Kitabein</span></Link>
      </div>
    </section>
  );
}
