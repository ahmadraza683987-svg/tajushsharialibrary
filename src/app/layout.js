// src/app/layout.js
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

export const metadata = {
  title: "Tajush Sharia Library",
  description: "دینی کتب کا آن لائن ذخیرہ — پڑھیں، تلاش کریں، ڈاؤنلوڈ کریں",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl">
      <body className="app-body">
        <Header />
        {/* Search بار ہر صفحے پر، Header کے نیچے */}
        <div className="layout-search">
          <SearchBar />
        </div>

        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
