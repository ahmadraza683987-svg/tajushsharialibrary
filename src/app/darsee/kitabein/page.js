import booksData from "../../../data/books.json";

export default function KitabeinPage() {
  const kitabein = booksData.filter(
    (b) => b.category === "درسی کتابیں" && b.subcategory === "کتب"
  );

  return (
    <main className="main-content">
      <h2 className="section-title">📘 کتابیں (Kitabein)</h2>
      <div className="book-grid">
        {kitabein.map((book) => (
          <div key={book.id} className="card">
            <img src={book.cover} alt={book.title} className="card-cover" />
            <div className="card-body">
              <h4 className="card-title">{book.title}</h4>
              <p className="card-author">{book.author}</p>
              <a href={book.download} target="_blank" className="btn small">
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
