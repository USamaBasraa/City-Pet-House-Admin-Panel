// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo6TEjWUnaTt6Y1UyxOMbSJ5Ab6hNhO2E",
  authDomain: "city-pet-house.firebaseapp.com",
  projectId: "city-pet-house",
  storageBucket: "city-pet-house.appspot.com",
  messagingSenderId: "376691396557",
  appId: "1:376691396557:web:7e66769e4e095ae1a73e84",
  measurementId: "G-VM804SPGJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, doc, getDoc, updateDoc };
