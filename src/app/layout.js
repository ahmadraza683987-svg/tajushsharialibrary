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
      <head>
        {/* ✅ Urdu + English Fonts from Google */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="app-body">  
        {/* ✅ Header */}
        <Header />  

        {/* ✅ Search Bar ہر صفحے پر */}
        <div className="layout-search">  
          <SearchBar />  
        </div>  
  
        {/* ✅ Main Content */}
        <main className="main-content">{children}</main>  

        {/* ✅ Footer */}
        <Footer />  
      </body>  
    </html>  
  );  
}
