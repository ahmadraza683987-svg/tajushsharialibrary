// src/components/Header.js
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <Link href="/" className="site-logo">تاج الشریعہ لائبریری</Link>
          <div className="site-sub">Tajush Sharia Library</div>
        </div>

        <nav className={`header-nav ${open ? "open" : ""}`}>
          <Link href="/">ہوم</Link>
          <Link href="/books">کتب</Link>
          <Link href="/favorites">میری پسندیدہ</Link>
        </nav>

        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </div>
    </header>
  );
}
