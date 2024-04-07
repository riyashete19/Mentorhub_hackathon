import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

//mentorhub-mentieshub
const firebaseConfig = {
  apiKey: "AIzaSyCgu9ub6_2cv3hrpOxnavwPWmLbEBBzq3I",
  authDomain: "mentorhub-mentieshub.firebaseapp.com",
  projectId: "mentorhub-mentieshub",
  storageBucket: "mentorhub-mentieshub.appspot.com",
  messagingSenderId: "457830737655",
  appId: "1:457830737655:web:4abd78529ac154d77615f2",
  measurementId: "G-XF6TYRMKJD"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
export const realtime = getDatabase(app);