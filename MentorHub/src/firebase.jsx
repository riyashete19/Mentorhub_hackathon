import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGpVxaOqQgHZUgFEdpQq7ujvE54c456vc",
  authDomain: "mentorhub-databse.firebaseapp.com",
  projectId: "mentorhub-databse",
  storageBucket: "mentorhub-databse.appspot.com",
  messagingSenderId: "944346962302",
  appId: "1:944346962302:web:19a68a5912a4abda1c3b2f",
  measurementId: "G-CNX80G5E68"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
