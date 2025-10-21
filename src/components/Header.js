"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "../styles/Header.module.css";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // اسکرین کے کسی بھی حصہ پر کلک کرنے سے مینو بند
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand" onClick={() => router.push("/")}>
          <span className="site-logo">📚 تاج الشریعہ لائبریری</span>
          <span className="site-sub">Tajush Sharia Library</span>
        </div>

        {/* Desktop Nav */}
        <nav className="header-nav">
          <Link href="/">🏠 ہوم</Link>
          <Link href="/books">📘 کتب</Link>
          <Link href="/favorites">⭐ میری پسندیدہ</Link>
          <Link href="/admin">⚙️ ایڈمن اپلوڈ</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="mobile-nav" ref={menuRef}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              🏠 ہوم
            </Link>
            <Link href="/books" onClick={() => setMenuOpen(false)}>
              📘 کتب
            </Link>
            <Link href="/favorites" onClick={() => setMenuOpen(false)}>
              ⭐ میری پسندیدہ
            </Link>
            <Link href="/admin" onClick={() => setMenuOpen(false)}>
              ⚙️ ایڈمن اپلوڈ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
