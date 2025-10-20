// ✅ src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM4SpxaDGdzqz_2ywOqr3nHTlnfK3EWfA",
  authDomain: "tajushsharialibrary.firebaseapp.com",
  projectId: "tajushsharialibrary",
  storageBucket: "tajushsharialibrary.firebasestorage.app",
  messagingSenderId: "859252166907",
  appId: "1:859252166907:web:b4106cfef88964a8c3605e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
