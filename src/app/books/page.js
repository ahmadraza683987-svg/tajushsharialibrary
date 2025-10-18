// src/app/books/page.js
import BookGrid from "../../components/BookGrid";
import booksData from "../../data/books.json";

export default function BooksPage() {
  return (
    <section>
      <h2 className="section-title">کتب</h2>
      <BookGrid books={booksData} />
    </section>
  );
}
