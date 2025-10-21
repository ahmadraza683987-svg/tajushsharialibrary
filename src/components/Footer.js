import React from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["site-footer"]}>
      <p>© {new Date().getFullYear()} تاج الشریعہ لائبریری — تمام حقوق محفوظ ہیں 📚</p>
    </footer>
  );
}
