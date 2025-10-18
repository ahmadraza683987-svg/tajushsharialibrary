import booksData from "../../../data/books.json";

export default function ShuruhatPage() {
  const shuruhat = booksData.filter(
    (b) => b.category === "درسی کتابیں" && b.subcategory === "شروحات"
  );

  return (
    <main className="main-content">
      <h2 className="section-title">📖 شروحات (Shuruhat)</h2>
      {shuruhat.length === 0 ? (
        <p>فی الحال کوئی شرح دستیاب نہیں ہے۔</p>
      ) : (
        <div className="book-grid">
          {shuruhat.map((book) => (
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
      )}
    </main>
  );
}
