// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";




const firebaseConfig = {
  apiKey: "AIzaSyCHwwnSyiZPtAvypzRjecE9QUrLU15kNYo",
  authDomain: "hirementis-c0429.firebaseapp.com",
  projectId: "hirementis-c0429",
  storageBucket: "hirementis-c0429.firebasestorage.app",
  messagingSenderId: "462892169133",
  appId: "1:462892169133:web:58521090c3962ed8025324",
  measurementId: "G-1H4GF96LSG"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);