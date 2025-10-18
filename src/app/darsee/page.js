import Link from "next/link";

export default function DarseePage() {
  return (
    <main className="main-content">
      <h2 className="section-title">📚 درسی کتابیں (Darsee Kitabein)</h2>

      <div className="category-grid">
        <Link href="/darsee/kitabein" className="btn outline">
          📘 کتابیں (Kitabein)
        </Link>
        <Link href="/darsee/shuruhat" className="btn outline">
          📖 شروحات (Shuruhat)
        </Link>
      </div>
    </main>
  );
}
