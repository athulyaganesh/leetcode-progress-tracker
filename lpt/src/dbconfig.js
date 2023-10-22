import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAeQd4zH5enx0oHMySFAGpKwkhj_N7i5HQ",
  authDomain: "leettrack-d60d0.firebaseapp.com",
  projectId: "leettrack-d60d0",
  storageBucket: "leettrack-d60d0.appspot.com",
  messagingSenderId: "927442015937",
  appId: "1:927442015937:web:3d6cf60300d060fe57a640",
  measurementId: "G-E9074TT3PD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); 